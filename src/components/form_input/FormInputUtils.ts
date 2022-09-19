import { getPhoneNumberWithDialCode, isPhoneFields } from '@utils';

/**
 * It takes a string and returns a formatted string
 * @param {boolean} isLowerCase - boolean - if true, the value will be converted to lowercase
 * @param {boolean} isPhoneCase - boolean - if true, the phone number will be formatted with the
 * country code.
 * @param {string} [value] - The value of the input field.
 * @returns A string
 */
export function getChangeValue(isLowerCase: boolean, isPhoneCase: boolean, value?: string): string {
  let text = isLowerCase ? value?.toLowerCase() : value;
  if (isPhoneCase && isPhoneFields(text)) {
    text = getPhoneNumberWithDialCode(text);
  }
  return text ?? '';
}
