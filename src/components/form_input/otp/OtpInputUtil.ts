import Clipboard from '@react-native-clipboard/clipboard';
import { Platform, TextInput } from 'react-native';

import { isIos } from '@themes';

import { fieldList } from './useOtpInput';

const majorVersionIOS: number = parseInt(String(Platform.Version), 10);
export const isAutoFillSupported: boolean = isIos && majorVersionIOS >= 12;

export function codeToArray(code?: string): string[] {
  return code?.split('') ?? [];
}

export function focusField(
  index: number,
  fields: React.LegacyRef<TextInput>[] | undefined[],
  setSelectedIndex: (index: number) => void
): void {
  if (index < fields.length) {
    if (fields?.[index]) {
      // @ts-ignore
      (fields[index] as TextInput).focus();
    }
    setSelectedIndex(index);
  }
}

export function blurAllFields(
  fields: React.LegacyRef<TextInput>[] | undefined[],
  setSelectedIndex: (index: number) => void
): void {
  fields.forEach((field: React.LegacyRef<TextInput> | undefined) => {
    if (field) {
      // @ts-ignore
      (field as TextInput).blur();
    }
  });
  setSelectedIndex(-1);
}

export function clearAllFields(
  clearInputs: boolean | undefined,
  code: string | undefined,
  setDigits: (digits: string[]) => void,
  setSelectedIndex: (index: number) => void
): void {
  if (clearInputs && code === '') {
    setSelectedIndex?.(0);
    setDigits?.([]);
  }
}

function notifyCodeChanged(digits: string[], onCodeChanged?: (code: string) => void): void {
  const code = digits.join('');
  onCodeChanged?.(code);
}

// TODO: Used below vaiable in checkPinCodeFromClipBoard function only.
let clipBoardCode: string | undefined;
let hasCheckedClipBoard: boolean | undefined;
export function checkPinCodeFromClipBoard(
  pinCount: number,
  fields: React.LegacyRef<TextInput>[] | undefined[],
  onCodeFilled: ((code: string) => void) | undefined,
  onCodeChanged: ((code: string) => void) | undefined,
  setDigits: (digits: string[]) => void,
  setSelectedIndex: (index: number) => void
): void {
  const regexp = new RegExp(`^\\d{${pinCount}}$`);
  Clipboard.getString()
    .then((code) => {
      if (hasCheckedClipBoard && regexp.test(code) && clipBoardCode !== code) {
        setDigits?.(code.split(''));
        blurAllFields(fields, setSelectedIndex);
        notifyCodeChanged(code.split(''), onCodeChanged);
        onCodeFilled?.(code);
      }
      clipBoardCode = code;
      hasCheckedClipBoard = true;
    })
    .catch(() => {});
}

export function bringUpKeyBoardIfNeeded(
  autoFocusOnLoad: boolean | undefined,
  pinCount: number,
  digitsMemo: string[],
  fields: React.LegacyRef<TextInput>[] | undefined[],
  setSelectedIndex: (index: number) => void
): void {
  const focusIndex = digitsMemo.length ? digitsMemo.length - 1 : 0;
  if (focusIndex < pinCount && autoFocusOnLoad) {
    focusField(focusIndex, fields, setSelectedIndex);
  }
}

export function handleChangeText(
  index: number,
  text: string,
  pinCount: number,
  digitsMemo: string[],
  onCodeFilled: ((code: string) => void) | undefined,
  onCodeChanged: ((code: string) => void) | undefined,
  setDigits: (digits: string[]) => void,
  setSelectedIndex: (index: number) => void
): void {
  let newdigits = digitsMemo.slice();
  const oldTextLength = newdigits[index] ? newdigits[index].length : 0;
  const newTextLength = text.length;
  if (newTextLength - oldTextLength === pinCount) {
    // user pasted text in.
    newdigits = text.split('').slice(oldTextLength, newTextLength);
    setDigits(newdigits);
    notifyCodeChanged(newdigits, onCodeChanged);
  } else {
    if (text.length === 0) {
      if (newdigits.length > 0) {
        newdigits = newdigits.slice(0, newdigits.length - 1);
      }
    } else {
      text.split('').forEach((value) => {
        if (index < pinCount) {
          newdigits[index] = value;
          index += 1;
        }
      });
      index -= 1;
    }
    setDigits(newdigits);
    notifyCodeChanged(newdigits, onCodeChanged);
  }

  const result = newdigits.join('');
  if (result.length >= pinCount) {
    onCodeFilled?.(result);
    focusField(pinCount - 1, fieldList, setSelectedIndex);
    blurAllFields(fieldList, setSelectedIndex);
  } else if (text.length > 0 && index < pinCount - 1) {
    focusField(index + 1, fieldList, setSelectedIndex);
  }
}

export function handleKeyPressTextInput(
  index: number,
  key: string,
  pinCount: number,
  digitsMemo: string[],
  onCodeFilled: ((code: string) => void) | undefined,
  onCodeChanged: ((code: string) => void) | undefined,
  setDigits: (digits: string[]) => void,
  setSelectedIndex: (index: number) => void
): void {
  if (key === 'Backspace') {
    if (!digitsMemo[index] && index > 0) {
      handleChangeText(index - 1, '', pinCount, digitsMemo, onCodeFilled, onCodeChanged, setDigits, setSelectedIndex);
      focusField(index - 1, fieldList, setSelectedIndex);
    }
  }
}
