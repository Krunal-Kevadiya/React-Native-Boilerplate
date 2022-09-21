import Clipboard from '@react-native-clipboard/clipboard';
import { Platform, TextInput } from 'react-native';

import { isIos } from '@themes';

import { fieldList } from './useOtpInput';

const majorVersionIOS: number = parseInt(String(Platform.Version), 10);
export const isAutoFillSupported: boolean = isIos && majorVersionIOS >= 12;

/**
 * split OTP code string to array of strings
 * @param {string} [code=''] - the code to convert to an array of characters.
 * @returns {string[]} - an array of characters in the code.
 */
export function codeToArray(code?: string): string[] {
  return code?.split('') ?? [];
}

/**
 * It focuses a field at a given index, and sets the selected index to that index
 * @param {number} index - the index of the field to focus on.
 * @param {React.LegacyRef<TextInput>[] | undefined[]} fields - the array of fields to focus on.
 * @param {(index: number) => void} setSelectedIndex - the function to set the selected index.
 * @returns None
 */
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

/**
 * Blurs all the fields in the given array.
 * @param {React.LegacyRef<TextInput>[] | undefined[]} fields - the array of fields to blur.
 * @param {(index: number) => void} setSelectedIndex - the function to set the selected index.
 * @returns None
 */
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

/**
 * Clears all fields in the form if the clearInputs flag is true and the code is empty.
 * @param {boolean | undefined} clearInputs - whether or not to clear the inputs.
 * @param {string | undefined} code - the code to check against.
 * @param {(digits: string[]) => void} setDigits - the function to set the digits.
 * @param {(index: number) => void} setSelectedIndex - the function to set the selected index.
 * @returns None
 */
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

/**
 * Notifies the code changed function that the code has changed.
 * @param {string[]} digits - the digits that were changed
 * @param {(code: string) => void} [onCodeChanged] - the function to call when the code changes.
 * @returns None
 */
function notifyCodeChanged(digits: string[], onCodeChanged?: (code: string) => void): void {
  const code = digits.join('');
  onCodeChanged?.(code);
}

// TODO: Used below variable in checkPinCodeFromClipBoard function only.
let clipBoardCode: string | undefined;
let hasCheckedClipBoard: boolean | undefined;

/**
 * Checks the clipboard for a code and if it is valid, fills the fields with it.
 * @param {number} pinCount - the number of digits in the code
 * @param {React.LegacyRef<TextInput>[] | undefined[]} fields - the fields to fill with the code
 * @param {((code: string) => void) | undefined} onCodeFilled - the function to call when the code is filled
 * @param {((code: string) => void) | undefined} onCodeChanged - the function to call when the code is changed
 * @param {(digits: string[]) => void} setDigits - apply otp into the fields
 * @param {(index: number) => void} setSelectedIndex - change selected fields index
 * @returns None
 */
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

/**
 * Brings up the keyboard if needed.
 * @param {boolean | undefined} autoFocusOnLoad - whether or not to auto focus on load.
 * @param {number} pinCount - the number of pins.
 * @param {string[]} digitsMemo - the digits that have been entered.
 * @param {React.LegacyRef<TextInput>[] | undefined[]} fields - the fields to focus on.
 * @param {(index: number) => void} setSelectedIndex - the function to set the selected index.
 * @returns None
 */
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

/**
 * Handles the change of text in the input fields.
 * @param {number} index - the index of the input field that has changed.
 * @param {string} text - the new text in the input field.
 * @param {number} pinCount - the number of input fields.
 * @param {string[]} digitsMemo - the current state of the input fields.
 * @param {((code: string) => void) | undefined} onCodeFilled - the function to call when the code is filled.
 * @param {((code: string) => void) | undefined} onCodeChanged - the function to call when the code
 * @param {(digits: string[]) => void} setDigits - the function to set the digits.
 * @param {(index: number) => void} setSelectedIndex - the function to set the selected index.
 * @returns None
 */
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
  let newDigits = digitsMemo.slice();
  const oldTextLength = newDigits[index] ? newDigits[index].length : 0;
  const newTextLength = text.length;
  if (newTextLength - oldTextLength === pinCount) {
    // user pasted text in.
    newDigits = text.split('').slice(oldTextLength, newTextLength);
    setDigits(newDigits);
    notifyCodeChanged(newDigits, onCodeChanged);
  } else {
    if (text.length === 0) {
      if (newDigits.length > 0) {
        newDigits = newDigits.slice(0, newDigits.length - 1);
      }
    } else {
      text.split('').forEach((value) => {
        if (index < pinCount) {
          newDigits[index] = value;
          index += 1;
        }
      });
      index -= 1;
    }
    setDigits(newDigits);
    notifyCodeChanged(newDigits, onCodeChanged);
  }

  const result = newDigits.join('');
  if (result.length >= pinCount) {
    onCodeFilled?.(result);
    focusField(pinCount - 1, fieldList, setSelectedIndex);
    blurAllFields(fieldList, setSelectedIndex);
  } else if (text.length > 0 && index < pinCount - 1) {
    focusField(index + 1, fieldList, setSelectedIndex);
  }
}

/**
 * Handles the key press event for the text input fields.
 * @param {number} index - the index of the text input field.
 * @param {string} key - the key that was pressed.
 * @param {number} pinCount - the number of pins.
 * @param {string[]} digitsMemo - the memo of the digits.
 * @param {((code: string) => void)} onCodeFilled - the callback for when the code is filled.
 * @param {((code: string) => void)} onCodeChanged - the callback for when the code is changed.
 * @param {(digits: string[]) => void} setDigits - the function to set the digits.
 * @param {(index: number) => void} setSelectedIndex - the function to set the selected index.
 * @returns None
 */
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
