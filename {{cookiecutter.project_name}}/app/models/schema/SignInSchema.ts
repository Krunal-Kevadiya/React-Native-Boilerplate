import * as Yup from 'yup';

import { StringConst } from '@constants';

/**
 * A validation schema for the sign in form.
 * @returns {Yup.ObjectSchema}
 */
export const SignInFormSchema = Yup.object().shape({
  email: Yup.string().required(StringConst.YupError.requireEmail).email(StringConst.YupError.validEmail),
  password: Yup.string().required(StringConst.YupError.requirePassword)
});
