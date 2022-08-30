import { SignInFormModel } from '@models';
import { isPresentValue } from '@utils';
import type { FormikErrors } from 'formik';

export function isRemainingToFillForm(values: SignInFormModel, errors: FormikErrors<SignInFormModel>): boolean {
  const isError = isPresentValue(errors.email) || isPresentValue(errors.password);
  const isNoValue = !isPresentValue(values.email) || !isPresentValue(values.password);

  return isError || isNoValue;
}
