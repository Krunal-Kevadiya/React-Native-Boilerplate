import filter from 'lodash/filter';
import * as RNLocalize from 'react-native-localize';
import { MockData } from '@assets';

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

export function getPhoneNumberWithDialCode(number?: string): string {
  const phoneCode: string = getDefaultCode();
  return getPhoneNumber(number ?? '', phoneCode);
}
