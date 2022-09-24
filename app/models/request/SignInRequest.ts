import { instanceToPlain, plainToClass } from 'class-transformer';

import { cleanUndefOrNull } from '@utils';

/* It's a class that represents a request to sign in */
/**
 * A class that represents a request to sign in.
 * @param {string} email - the email of the user.
 * @param {string} password - the password of the user.
 */
export class SignInRequest {
  readonly email?: string;
  readonly password?: string;

  /**
   * A constructor for the sign in request class.
   * @param {string} email - the email of the user.
   * @param {string} password - the password of the user.
   * @returns None
   */
  constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }

  /**
   * Returns a plain object representation of the request.
   * @returns {object} - A plain object representation of the request.
   */
  get plainRequest() {
    return instanceToPlain<SignInRequest>(this, { exposeUnsetFields: false });
  }

  /**
   * Creates a SignInRequest object with the given email and password.
   * @param {string} email - the email to use for the request
   * @param {string} password - the password to use for the request
   * @returns {SignInRequest} - the SignInRequest object
   */
  static withInit(email: string, password: string): SignInRequest {
    return new SignInRequest(email, password);
  }

  /**
   * It takes an object and returns a new instance of the class SignInRequest.
   * @param {Record<string, any>} [object] - The object to be converted to a class.
   * @returns A new instance of SignInRequest
   */
  static withInitPlainObject(object?: Record<string, any>): SignInRequest {
    const tempObject = object ? cleanUndefOrNull(object) : object;
    return tempObject
      ? plainToClass<SignInRequest, Record<string, any>>(SignInRequest, tempObject)
      : new SignInRequest();
  }
}
