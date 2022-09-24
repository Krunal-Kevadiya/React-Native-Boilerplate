import { SignInFormModel } from '@models';
import { isPresentValue } from '@utils';
import type { FormikErrors } from 'formik';

/**
 * Checks if the form has any errors.
 * @param {SignInFormModel} values - the values of the form.
 * @param {FormikErrors<SignInFormModel>} errors - the errors of the form.
 * @returns {boolean} - true if the form has any errors, false otherwise.
 */
export function isRemainingToFillForm(values: SignInFormModel, errors: FormikErrors<SignInFormModel>): boolean {
  const isError = isPresentValue(errors.email) || isPresentValue(errors.password);
  const isNoValue = !isPresentValue(values.email) || !isPresentValue(values.password);

  return isError || isNoValue;
}
