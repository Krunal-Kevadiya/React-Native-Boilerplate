import { classToPlain, plainToClass } from 'class-transformer';

import { cleanUndefOrNull } from '@utils';

export class ErrorResponse {
  readonly statusCode?: number;
  readonly status?: boolean;
  readonly message?: string;
  readonly statusText?: string;
  isGlobalType?: boolean;

  constructor(statusCode?: number, status?: boolean, message?: string, statusText?: string, isGlobalType?: boolean) {
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
    this.statusText = statusText;
    this.isGlobalType = isGlobalType;
  }

  get plainRequest() {
    return classToPlain(this, { exposeUnsetFields: false });
  }

  setGlobalType(isGlobalType?: boolean) {
    this.isGlobalType = isGlobalType;
  }

  static withInit(
    statusCode?: number,
    status?: boolean,
    message?: string,
    statusText?: string,
    isGlobalType: boolean = true
  ): ErrorResponse {
    return new ErrorResponse(statusCode, status, message, statusText, isGlobalType);
  }

  static withInitError(message?: string, isGlobalType: boolean = true): ErrorResponse {
    return new ErrorResponse(undefined, false, message, 'Error', isGlobalType);
  }

  static withInitCancel(message?: string, isGlobalType: boolean = true): ErrorResponse {
    return new ErrorResponse(undefined, false, message, 'Cancel', isGlobalType);
  }

  static withInitPlainObject(object?: Object): ErrorResponse {
    const tempObject = object ? cleanUndefOrNull(object) : object;
    return tempObject ? plainToClass(ErrorResponse, tempObject) : new ErrorResponse();
  }
}
