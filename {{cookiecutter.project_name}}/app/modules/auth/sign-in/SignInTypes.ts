import { SignInFormModel } from '@models';
import type { FormikProps } from 'formik';

/**
 * The route params for the sign in screen.
 * @typedef {Object} SignInRouteParamList
 * @property {string} SignIn.email - The email of the user.
 */
export type SignInRouteParamList = {
  SignIn: {
    email: string;
  };
};

export type SignInHookReturnType = FormikProps<SignInFormModel> & { loading: boolean };
