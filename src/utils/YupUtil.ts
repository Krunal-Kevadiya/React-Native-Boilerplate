import * as Yup from 'yup';
import { RegexConst } from '@constants';

export function isEmailFields(value?: string | null): boolean {
  return Yup.string().email().isValidSync(value);
}

export function isPhoneFields(text?: string | null): boolean {
  return Yup.string().matches(RegexConst.phoneWithoutPlus).isValidSync(text);
}
