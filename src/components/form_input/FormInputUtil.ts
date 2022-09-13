import { getPhoneNumberWithDialCode, isPhoneFields } from '@utils';

export function getChangeValue(isLowerCase: boolean, isPhoneCase: boolean, value?: string): string {
  let text = isLowerCase ? value?.toLowerCase() : value;
  if (isPhoneCase && isPhoneFields(text)) {
    text = getPhoneNumberWithDialCode(text);
  }
  return text ?? '';
}
