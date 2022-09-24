import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { useDeepCompareCallback, usePrevious } from '@hooks';
import { isAndroid } from '@themes';
import {
  blurAllFields,
  bringUpKeyBoardIfNeeded,
  checkPinCodeFromClipBoard,
  clearAllFields,
  codeToArray,
  focusField
} from './OtpInputUtils';
import type { UseOtpInputPropsType, UseOtpInputReturnType } from './OtpInputTypes';

export const fieldList: React.LegacyRef<TextInput>[] | undefined[] = [];

/**
 * A otp input hook that returns the UseOtpInputPropsType type.
 * @param {string} code - the code to format
 * @param {boolean} autoFocusOnLoad - whether to focus the first field
 * @param {boolean} clearInputs - whether to clear the inputs
 * @param {number} pinCount - the number of pins
 * @param {(digits: string[]) => void} onCodeFilled - the function to call when the code is filled
 * @param {(digits: string[]) => void} onCodeChanged - the function to call when the code is changed
 * @returns {UseOtpInputReturnType} the digits, setDigits, and selectedIndex etc
 */
export function useOtpInput({
  code,
  autoFocusOnLoad,
  clearInputs,
  pinCount,
  onCodeFilled,
  onCodeChanged
}: UseOtpInputPropsType): UseOtpInputReturnType {
  const [localCode] = useState<string>(code ?? '');
  const [digits, setDigits] = useState<string[]>(codeToArray(code));
  const [selectedIndex, setSelectedIndex] = useState<number>(autoFocusOnLoad ? 0 : -1);

  const digitsMemo = useMemo<string[]>(() => (code === undefined ? digits : code.split('')), [code, digits]);

  const prevLocalCode = usePrevious<string>(localCode);

  const handlePress = useDeepCompareCallback<() => void>(() => {
    if (!clearInputs) {
      const filledPinCount = digitsMemo.filter((digit) => {
        return digit !== null && digit !== undefined;
      }).length;
      focusField(Math.min(filledPinCount, pinCount - 1), fieldList, setSelectedIndex);
    } else {
      clearAllFields(clearInputs, code, setDigits, setSelectedIndex);
      focusField(0, fieldList, setSelectedIndex);
    }
  }, [clearInputs, code, digitsMemo, pinCount]);

  useEffect(() => {
    if (prevLocalCode !== localCode) {
      setDigits(codeToArray(localCode));
    }
  }, [localCode, prevLocalCode]);

  useEffect(() => {
    let handleTimer: number;
    if (isAndroid) {
      checkPinCodeFromClipBoard(pinCount, fieldList, onCodeFilled, onCodeChanged, setDigits, setSelectedIndex);
      handleTimer = setInterval(() => {
        checkPinCodeFromClipBoard(pinCount, fieldList, onCodeFilled, onCodeChanged, setDigits, setSelectedIndex);
      }, 400);
    }
    bringUpKeyBoardIfNeeded(autoFocusOnLoad, pinCount, digitsMemo, fieldList, setSelectedIndex);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      blurAllFields(fieldList, setSelectedIndex);
    });

    return () => {
      if (handleTimer) clearInterval(handleTimer);
      keyboardDidHideListener?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    digits,
    setDigits,
    digitsMemo,
    selectedIndex,
    setSelectedIndex,
    handlePress
  };
}
