import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { useDeepCompareCallback, usePrevious } from '@hooks';
import { isAndroid } from '@themes';
import type { UseOtpInputPropsType, UseOtpInputReturnType } from './OtpInputType';
import {
  blurAllFields,
  bringUpKeyBoardIfNeeded,
  checkPinCodeFromClipBoard,
  clearAllFields,
  codeToArray,
  focusField
} from './OtpInputUtil';

export const fieldList: React.LegacyRef<TextInput>[] | undefined[] = [];

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
