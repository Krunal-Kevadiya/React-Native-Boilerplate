import React from 'react';

import { SignInFormModel } from '@models';

import type { FormikProps } from 'formik';

export type SignInRouteParamList = {
  SignIn: {
    email: string;
  };
};

export type UseSignInReturnType = {
  refSignIn: React.RefObject<FormikProps<SignInFormModel>>;
  onFormSubmit: (values: SignInFormModel) => void;
};
