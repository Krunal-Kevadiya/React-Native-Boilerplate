import { FormikProps } from 'formik';
import React from 'react';
import { SignInFormModel } from '@models';

export type SignInRouteParamList = {
  SignIn: {
    email: string;
  };
};

export type UseSignInReturnType = {
  refSignIn: React.RefObject<FormikProps<SignInFormModel>>;
  onFormSubmit: (values: SignInFormModel) => void;
};
