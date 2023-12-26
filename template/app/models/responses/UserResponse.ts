import { instanceToPlain, plainToInstance } from 'class-transformer';
import { cleanUndefOrNull } from '@utils';

/**
 * A class that represents a user response.
 * @property {string} id - The user's id.
 * @property {string} email - The user's email.
 * @property {string} phone - The user's phone number.
 * @property {string} displayName - The user's display name.
 * @property {string} photoURL - The user's profile image.
 * @property {string} message - The user's message.
 */
export class UserResponse {
  readonly id?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly displayName?: string;
  readonly photoURL?: string;

  /**
   * Get the profile image of the user.
   * @returns {string} The profile image of the user.
   */
  get getProfileImage() {
    return this.photoURL ?? '';
  }

  /**
   * Get the name of the profile that the user is using.
   * @returns {string} The name of the profile that the user is using.
   */
  get getProfileName() {
    return this.displayName ?? '';
  }

  /**
   * It converts the instance to a plain object.
   * @returns The plainRequest is being returned.
   */
  get plainRequest() {
    return instanceToPlain<UserResponse>(this, { exposeUnsetFields: false });
  }

  /**
   * Takes in an object and returns a new instance of UserResponse.
   * @param {Record<string, any>} [object] - The object to be converted to a class.
   * @returns {UserResponse} - A new instance of UserResponse.
   */
  static withInitPlainObject(object?: Record<string, any> | null): UserResponse {
    const tempObject = object ? cleanUndefOrNull(object) : object;
    return tempObject
      ? plainToInstance<UserResponse, Record<string, any>>(UserResponse, tempObject)
      : new UserResponse();
  }
}
