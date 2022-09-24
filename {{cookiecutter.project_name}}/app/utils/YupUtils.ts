import * as Yup from 'yup';
import { RegexConst } from '@constants';

/**
 * Checks if the value is a valid email address.
 * @param {string | null} value - the value to check
 * @returns {boolean} - true if the value is a valid email address, false otherwise
 */
export function isEmailFields(value?: string | null): boolean {
  return Yup.string().email().isValidSync(value);
}

/**
 * Checks if the given text is a valid phone number.
 * @param {string | null} text - the text to check
 * @returns {boolean} - true if the text is a valid phone number, false otherwise
 */
export function isPhoneFields(text?: string | null): boolean {
  return Yup.string().matches(RegexConst.phoneWithoutPlus).isValidSync(text);
}
