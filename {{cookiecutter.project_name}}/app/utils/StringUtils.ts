import isEmpty from 'lodash/isEmpty';
import isNaN from 'lodash/isNaN';
import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';
import { RegexConst } from '@constants';

/**
 * If the value is null or undefined, return true. Otherwise, return true if the string is empty or
 * contains only whitespace
 * @param {string | null} value - string | null
 * @returns A boolean value.
 */
function isNullOrWhiteSpace(value: string | null): boolean {
  try {
    if (value === null || value === 'undefined') {
      return true;
    }
    return value.toString().replace(RegexConst.stringClean, '').length < 1;
  } catch (e) {
    return false;
  }
}

/**
 * "Given a number and a format template, return a string that is the number formatted to the
 * template."
 *
 * The function takes two parameters:
 *
 * input: number
 * formatTemplate: string
 * The function returns a string
 * @param {number} input - The number to format
 * @param {string} formatTemplate - The format template to use.
 * @returns A string
 */
function formatNumber(input: number, formatTemplate: string): string {
  const count = formatTemplate.length;
  const stringValue = input.toString();
  if (count <= stringValue.length) {
    return stringValue;
  }

  let remainingCount = count - stringValue.length;
  remainingCount += 1; //Array must have an extra entry
  return new Array(remainingCount).join('0') + stringValue;
}

/**
 * It takes a string with placeholders in it, and replaces the placeholders with values from an object
 * @param {string} format - The string to format.
 * @param args - The arguments to be passed to the format string.
 * @param [parseByObject=false] - If the args parameter is an object, then this should be true.
 * @returns A string
 */
export function formatString(format: string, args: Record<string, any>): string {
  return format.replace(RegexConst.stringArg, function (match, x) {
    //0
    const s = match.split(':');
    if (s.length > 1) {
      x = s[0].replace('{', '');
      match = s[1].replace('}', ''); //U
    }

    let arg = args[x];
    if (arg === null || arg === undefined || match.match(RegexConst.stringFormat)) {
      return arg;
    }
    if ((typeof arg === 'number' || !isNaN(arg)) && !isNaN(+match) && !isNullOrWhiteSpace(arg)) {
      return formatNumber(arg, match);
    }
    return typeof arg !== 'undefined' && arg !== null ? arg : '';
  });
}

/**
 * Checks if the value is present.
 * @param {any} value - the value to check
 * @returns {boolean} - true if the value is present, false otherwise
 */
export function isPresentValue(value: any): boolean {
  return (
    !isNaN(value) &&
    !isNil(value) &&
    !isNull(value) &&
    (typeof value === 'number' || !isEmpty(value))
  );
}

/**
 * Takes in a string and returns the first two characters of the string.
 * @param {string} text - the string to get the first two characters of.
 * @returns {string} the first two characters of the string.
 */
export function getTwoInitialCharacters(text?: string): string {
  const array = (text ?? '').split(' ').filter((t) => isPresentValue(t));
  if (array.length >= 2) {
    return `${array[0].charAt(0)}${array[1].charAt(0)}`.toUpperCase();
  }
  return `${array[0].charAt(0)}`.toUpperCase();
}

/**
 * Generates a random string of the given length.
 * @param {number} len - the length of the string to generate.
 * @param {string} chars - the characters to use in the string.
 * @returns {string} - the generated string.
 */
export function generateId(
  len: number = 10,
  chars: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'
): string {
  let id = '';
  for (let i = 0; i < len; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}
