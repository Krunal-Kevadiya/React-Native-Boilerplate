import * as Yup from 'yup';
import { StringConst } from '@constants';

export const SignInFormSchema = Yup.object().shape({
  email: Yup.string().required(StringConst.yupError.requireEmail).email(StringConst.yupError.validEmail),
  password: Yup.string().required(StringConst.yupError.requirePassword)
});
