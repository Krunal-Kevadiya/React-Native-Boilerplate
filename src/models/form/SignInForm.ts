export class SignInFormModel {
  readonly email: string;
  readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static empty(email: string = '', password: string = ''): SignInFormModel {
    return new SignInFormModel(email, password);
  }
}
