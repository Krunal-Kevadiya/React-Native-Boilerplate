import { type RouteProp, useRoute } from '@react-navigation/core';
import { useFormik, type FormikProps } from 'formik';
import { useDispatch } from 'react-redux';
import { useLifecycle } from '@hooks';
import { SignInFormModel, SignInFormSchema, SignInRequest } from '@models';
import { AuthActions, type AppDispatchType } from '@stores';
import type { SignInRouteParamList } from './SignInTypes';

/**
 * Hook that returns the ref to the sign in form and the function to submit the form.
 * @returns {FormikProps<SignInFormModel>} - formik props.
 */
export default function useSignIn(): FormikProps<SignInFormModel> {
  const dispatch = useDispatch<AppDispatchType>();
  const route = useRoute<RouteProp<SignInRouteParamList, 'SignIn'>>();

  /* Creating a formik object that is used to submit the form. */
  const formik: FormikProps<SignInFormModel> = useFormik<SignInFormModel>({
    initialValues: SignInFormModel.empty(),
    validationSchema: SignInFormSchema,
    onSubmit: (values: SignInFormModel) => {
      dispatch(AuthActions.signInRequest(SignInRequest.withInit(values.email, values.password)));
    }
  });

  useLifecycle(
    () => {
      formik?.setFieldValue('email', route.params?.email);
    },
    () => {
      dispatch(AuthActions.signInRequestCancel());
    }
  );

  return formik;
}
