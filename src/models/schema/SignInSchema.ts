import * as Yup from 'yup';

import { StringConst } from '@constants';

/**
 * A validation schema for the sign in form.
 * @returns {Yup.ObjectSchema}
 */
export const SignInFormSchema = Yup.object().shape({
  email: Yup.string().required(StringConst.yupError.requireEmail).email(StringConst.yupError.validEmail),
  password: Yup.string().required(StringConst.yupError.requirePassword)
});
