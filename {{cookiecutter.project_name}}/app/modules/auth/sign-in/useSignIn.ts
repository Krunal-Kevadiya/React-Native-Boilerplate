import { type RouteProp, useRoute } from '@react-navigation/core';
import { useFormik, type FormikProps } from 'formik';
{% if cookiecutter.state_management == 'thunk' -%}
import { useRef } from 'react';
{% endif -%}
import { useLifecycle {% if cookiecutter.state_management == 'graphql' -%}, useMutationWithCancelToken {% endif -%} } from '@hooks';
import { SignInFormModel, SignInFormSchema, SignInRequest {%- if cookiecutter.state_management == 'thunk' -%}, UserResponse {% endif -%} } from '@models';
{% if cookiecutter.state_management != 'graphql' -%}
import { useSelector } from 'react-redux';
import { AuthActions, useAppDispatch, AuthSelectors, type RootStateType } from '@redux';
{% elif cookiecutter.state_management == "graphql" -%}
import { SIGN_IN } from '@graphql';
{% endif -%}
{% if cookiecutter.state_management == 'thunk' -%}
import type { APIDispatch } from '@configs';
{% endif -%}
import type { SignInHookReturnType, SignInRouteParamList } from './SignInTypes';

/**
 * Hook that returns the ref to the sign in form and the function to submit the form.
 * @returns {SignInHookReturnType} - formik props.
 */
export default function useSignIn(): SignInHookReturnType {
  {% if cookiecutter.state_management != 'graphql' -%}
  const dispatch = useAppDispatch();
  const loading: boolean = useSelector<RootStateType, boolean>(AuthSelectors.getLoading);
  {% elif cookiecutter.state_management == "graphql" -%}
  const [signInRequest, { loading }, abort] = useMutationWithCancelToken(SIGN_IN);
  {% endif -%}
  {% if cookiecutter.state_management == 'thunk' -%}
  const refSignInDispatch = useRef<APIDispatch<UserResponse>>();
  {% endif -%}
  const route = useRoute<RouteProp<SignInRouteParamList, 'SignIn'>>();

  /* Creating a formik object that is used to submit the form. */
  const formik: FormikProps<SignInFormModel> = useFormik<SignInFormModel>({
    initialValues: SignInFormModel.empty(),
    validationSchema: SignInFormSchema,
    onSubmit: (values: SignInFormModel) => {
      {% if cookiecutter.state_management == 'thunk' -%}
      refSignInDispatch.current = dispatch(
        AuthActions.signInRequest({
          data: SignInRequest.withInit(values.email, values.password)
          // TODO: You can change content type like below
          // setting: {
          //   headers: { 'Content-Type': 'multipart/form-data', Accept: 'multipart/form-data' }
          // }
        })
      );
      {% elif cookiecutter.state_management == "saga" -%}
      dispatch(AuthActions.signInRequest(SignInRequest.withInit(values.email, values.password)));
      {% elif cookiecutter.state_management == "graphql" -%}
      signInRequest({
        variables: SignInRequest.withInit(values.email, values.password)
      });
      {% endif -%}
      
    }
  });

  useLifecycle(
    () => {
      formik?.setFieldValue('email', route.params?.email);
    },
    () => {
      {% if cookiecutter.state_management == 'thunk' -%}
      refSignInDispatch.current?.abort();
      {% elif cookiecutter.state_management == "saga" -%}
      dispatch(AuthActions.signInRequestCancel());
      {% elif cookiecutter.state_management == "graphql" -%}
      abort();
      {% endif %}
    }
  );

  return { ...formik, loading };
}
