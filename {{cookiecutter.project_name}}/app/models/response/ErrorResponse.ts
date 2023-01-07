import { instanceToPlain, plainToClass } from 'class-transformer';
import { cleanUndefOrNull } from '@utils';

/**
 * A class that represents an error response.
 * @param {string} message - The error message.
 * @param {boolean} isGlobalType - Whether or not the response is a global type.
 */
export class ErrorResponse {
  readonly status?: number;
  readonly message?: string;
  isGlobalType: boolean;

  /**
   * A class that represents a error response from the API.
   * @param {number} [status=0] - The status code of the response.
   * @param {string} [message=""] - The message of the response.
   * @param {boolean} [isGlobalType=false] - Whether or not the response is a global type.
   */
  constructor(status: number | undefined, message: string | undefined, isGlobalType: boolean) {
    this.status = status;
    this.message = message;
    this.isGlobalType = isGlobalType;
  }

  /**
   * It returns a plain object representation of the instance.
   * @returns The plainRequest property is being returned.
   */
  get plainRequest() {
    return instanceToPlain<ErrorResponse>(this, { exposeUnsetFields: false });
  }

  /**
   * Sets the global type of the filter.
   * @param {boolean} [isGlobalType=false] - whether the filter is global or not.
   * @returns None
   */
  setGlobalType(isGlobalType: boolean) {
    this.isGlobalType = isGlobalType;
  }

  /**
   * Creates an ErrorResponse object.
   * @param {number} [status=500] - the status code of the error.
   * @param {string} [message="Internal Server Error"] - the message of the error.
   * @param {boolean} [isGlobalType=true] - whether or not the error is global.
   * @returns {ErrorResponse} - the error response object.
   */
  static withInit(status?: number, message?: string, isGlobalType: boolean = true): ErrorResponse {
    return new ErrorResponse(status, message, isGlobalType);
  }

  /**
   * Creates an ErrorResponse object with the given message.
   * @param {string} [message] - the message to include in the ErrorResponse object.
   * @param {boolean} [isGlobalType=true] - whether or not the error is a global type error.
   * @returns {ErrorResponse} - the ErrorResponse object.
   */
  static withInitError(message?: string, isGlobalType: boolean = true): ErrorResponse {
    return new ErrorResponse(undefined, message, isGlobalType);
  }

  /**
   * Takes in an object and returns an ErrorResponse object.
   * @param {Record<string, any>} [object] - the object to convert to an ErrorResponse object.
   * @returns {ErrorResponse} - the ErrorResponse object.
   */
  static withInitPlainObject(object?: Record<string, any>): ErrorResponse {
    const tempObject = object ? cleanUndefOrNull(object) : object;
    return tempObject
      ? plainToClass<ErrorResponse, Record<string, any>>(ErrorResponse, tempObject)
      : new ErrorResponse(undefined, undefined, false);
  }
}
