import { classToPlain, plainToClass } from 'class-transformer';
import { cleanUndefOrNull } from '@utils';

export class SignInRequest {
  readonly email?: string;
  readonly password?: string;

  constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }

  get plainRequest() {
    return classToPlain(this, { exposeUnsetFields: false });
  }

  static withInit(email: string, password: string): SignInRequest {
    return new SignInRequest(email, password);
  }

  static withInitPlainObject(object?: Object): SignInRequest {
    const tempObject = object ? cleanUndefOrNull(object) : object;
    return tempObject ? plainToClass(SignInRequest, tempObject) : new SignInRequest();
  }
}
