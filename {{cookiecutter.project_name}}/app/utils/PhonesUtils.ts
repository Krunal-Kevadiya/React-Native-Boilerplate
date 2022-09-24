import filter from 'lodash/filter';
import * as RNLocalize from 'react-native-localize';

import { MockData } from '@assets';

/**
 * Gets the default country code for the current locale.
 * @returns {string} The default country code for the current locale.
 */
export function getDefaultCode(): string {
  const countryCode: string = RNLocalize.getCountry();
  let phoneCode: string = '';
  const country = filter(MockData.countryList, { Iso2: countryCode.toUpperCase() });
  if (country.length > 0) {
    phoneCode = country[0].Dial ?? '';
    const listByAnd = phoneCode.split(' and ');
    const listByDash = listByAnd[0].split('-');

    phoneCode = listByDash[0];
  }
  return phoneCode;
}

/**
 * Takes in a string of a phone number and returns a string of the phone number with the
 * correct country code.
 * @param {string} number - the phone number to format
 * @param {string} phoneCode - the country code of the phone number
 * @returns {string} the formatted phone number
 */
export function getPhoneNumber(number: string, phoneCode: string): string {
  let no: string = number;
  const numberLength: number = no.length;
  const isPlus: boolean = no.startsWith('+');
  const isDialCode: boolean = no.includes(phoneCode);
  if (numberLength >= 10) {
    if (numberLength === 10 && !isPlus && !isDialCode) {
      no = `+${phoneCode}${no}`;
    } else if (numberLength === 11 && isPlus && !isDialCode) {
      no = `+${phoneCode}${no.substring(1, 11)}`;
    } else if (isPlus) {
      no = number;
    } else {
      no = `+${no}`;
    }
  }
  return no;
}

/**
 * Get the phone number with the default country code.
 * @param {string} [number] - the phone number to format.
 * @returns {string} the formatted phone number.
 */
export function getPhoneNumberWithDialCode(number?: string): string {
  const phoneCode: string = getDefaultCode();
  return getPhoneNumber(number ?? '', phoneCode);
}
