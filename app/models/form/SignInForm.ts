/**
 * A class that represents the data that is used to sign in form.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 */
export class SignInFormModel {
  readonly email: string;
  readonly password: string;

  /**
   * A constructor for the sign in form model class.
   * @param {string} email - the email of the user.
   * @param {string} password - the password of the user.
   * @returns None
   */
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  /**
   * Creates an empty SignInFormModel object.
   * @param {string} [email=''] - the email to set the form to.
   * @param {string} [password=''] - the password to set the form to.
   * @returns {SignInFormModel} - the empty SignInFormModel object.
   */
  static empty(email: string = '', password: string = ''): SignInFormModel {
    return new SignInFormModel(email, password);
  }
}
