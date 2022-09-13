import { type RouteProp, useRoute } from '@react-navigation/core';
import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLifecycle } from '@hooks';
import { SignInFormModel, SignInRequest } from '@models';
import { AuthActions } from '@stores';
import type { SignInRouteParamList, UseSignInReturnType } from './SignInType';
import type { AppDispatchType } from '@stores';
import type { FormikProps } from 'formik';

export default function useSignIn(): UseSignInReturnType {
  const dispatch = useDispatch<AppDispatchType>();
  const refSignIn = useRef<FormikProps<SignInFormModel>>(null);
  const route = useRoute<RouteProp<SignInRouteParamList, 'SignIn'>>();

  const onFormSubmit = useCallback<(values: SignInFormModel) => void>((values: SignInFormModel) => {
    dispatch(AuthActions.signInRequest(SignInRequest.withInit(values.email, values.password)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLifecycle(
    () => {
      refSignIn.current?.setFieldValue('email', route.params?.email);
      refSignIn.current?.setFieldValue('email', 'eve.holt@reqres.in');
      refSignIn.current?.setFieldValue('password', 'cityslicka');
    },
    () => {
      dispatch(AuthActions.signInRequestCancel());
    }
  );

  return {
    refSignIn,
    onFormSubmit
  };
}
