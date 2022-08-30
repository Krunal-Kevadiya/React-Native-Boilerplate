import { classToPlain, plainToClass, Type } from 'class-transformer';
import { SuccessOther } from '@models-other';
import { cleanUndefOrNull } from '@utils';

export class UserResponse {
  readonly id?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly displayName?: string;
  readonly photoURL?: string;

  get getProfileImage() {
    return this.photoURL ?? '';
  }

  get getProfileName() {
    return this.displayName ?? '';
  }

  get plainRequest() {
    return classToPlain(this, { exposeUnsetFields: false });
  }

  static withInitPlainObject(object?: Object): UserResponse {
    const tempObject = object ? cleanUndefOrNull(object) : object;
    return tempObject ? plainToClass(UserResponse, tempObject) : new UserResponse();
  }
}

export class SuccessUserResponse extends SuccessOther {
  @Type(() => UserResponse)
  readonly data?: UserResponse;
}
