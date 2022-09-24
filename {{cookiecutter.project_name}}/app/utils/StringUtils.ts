import isEmpty from 'lodash/isEmpty';
import isNaN from 'lodash/isNaN';
import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';
import { RegexConst, StringConst } from '@constants';

/**
 * Takes in a string of code and adds the correct amount of spaces to the beginning of each line.
 * @param {string} fmt - the format string to format
 * @param {any[]} args - the arguments to format the string with
 * @returns {string} the formatted string
 */
export function format(fmt: string, ...args: any[]): string {
  if (!fmt.match(RegexConst.stringFormat)) {
    throw new Error(`${StringConst.Message.stringInvalidFormat} ${fmt}`);
  }
  return fmt.replace(RegexConst.stringArg, (_m: string, str, index) => {
    if (str) {
      return str.replace(RegexConst.stringArgFormat, (m1: string) => m1[0]);
    }
    if (index >= args.length) {
      throw new Error(`${StringConst.Message.stringArgumentIndexOutOfRangeInFormat} ${index}`);
    }
    return args[index];
  });
}

/**
 * Checks if the value is present.
 * @param {any} value - the value to check
 * @returns {boolean} - true if the value is present, false otherwise
 */
export function isPresentValue(value: any): boolean {
  return !isNaN(value) && !isNil(value) && !isNull(value) && !isEmpty(value);
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
