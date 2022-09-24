import apisauce, {
  type ApiResponse,
  type ApisauceInstance,
  CancelToken,
  type ApiErrorResponse,
  CANCEL_ERROR,
  CLIENT_ERROR,
  CONNECTION_ERROR,
  NETWORK_ERROR,
  SERVER_ERROR,
  TIMEOUT_ERROR
} from 'apisauce';
import { type ClassConstructor, plainToClass } from 'class-transformer';
import { CANCEL } from 'redux-saga';
import { call, type CallEffect, cancelled, type CancelledEffect } from 'redux-saga/effects';

import { StringConst } from '@constants';
import { ErrorResponse } from '@models';

type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

/**
 * It creates an Apisauce instance with a base URL and some headers
 * @param {string} baseURL - The base URL of the API.
 * @returns {ApisauceInstance} - The API instance
 */
export function apiConfig(baseURL: string): ApisauceInstance {
  return apisauce.create({
    baseURL,
    timeout: 120000,
    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' }
  });
}

/**
 * Makes a request to the API with the given config.
 * A function that takes in an object with an api, method, url, params, data, and setting
 * property. It also takes in a source parameter.
 * @property {ApisauceInstance} api - The Apisauce instance that will be used to make the request.
 * @property {Method} method - The HTTP method to use.
 * @property {string} url - The url of the endpoint you're trying to hit.
 * @property {any} data - The data to be sent to the server.
 * @property {Record<string, any>} params - The query parameters to be sent with the request.
 * @property {Record<string, any>} setting - This is an object that contains the following properties:
 * @returns {Promise<ApiResponse<Response>>} - the response from the API
 */
export function apiWithCancelToken<Response>(
  api: ApisauceInstance,
  method: Method,
  url: string,
  args: {
    data?: Record<string, any>;
    params?: Record<string, any>;
    setting?: Record<string, any>;
  }
): Promise<ApiResponse<Response, Response>> {
  const httpMethod: string = method.toLowerCase();

  const hasData: boolean = ['post', 'put', 'patch'].indexOf(httpMethod) >= 0;
  const source = CancelToken.source();
  const settings = args.setting || {};

  // @ts-ignore
  settings.cancelToken = source.token;

  const request: Promise<ApiResponse<Response, Response>> = hasData
    ? // @ts-ignore
      api[httpMethod](url, args.data, settings)
    : // @ts-ignore
      api[httpMethod](url, args.params, settings);

  // @ts-ignore
  request[CANCEL] = () => source.cancel();

  return request;
}

/**
 * Handles the error response from the API.
 * @param {ApiErrorResponse<any>} response - the error response from the API.
 * @param {string} defaultMessage - the default message to display if the response does not
 * contain a message.
 * @returns {ErrorResponse} - the error response to be displayed.
 */
function handleClientError(response: ApiErrorResponse<any>, defaultMessage: string): ErrorResponse {
  const { message } = response.data ?? {};
  const messages = message ?? defaultMessage;
  return ErrorResponse.withInit(response.status, messages);
}
//StringConst.apiError.somethingWentWrong

/**
 * Handles the error response from the API.
 * @param {ApiErrorResponse<Response>} response - the error response from the API.
 * @param {string} defaultMessage - the default message to display if the error response is
 * not handled.
 * @returns {ErrorResponse} - the error response to display.
 */
async function handleError(response: ApiErrorResponse<any>): Promise<ErrorResponse> {
  switch (response.problem) {
    case CLIENT_ERROR:
      return handleClientError(response, StringConst.apiError.client);
    case SERVER_ERROR:
      return handleClientError(response, StringConst.apiError.server);
    case TIMEOUT_ERROR:
      return handleClientError(response, StringConst.apiError.timeout);
    case CONNECTION_ERROR:
      return handleClientError(response, StringConst.apiError.connection);
    case NETWORK_ERROR:
      return handleClientError(response, StringConst.apiError.network);
    case CANCEL_ERROR:
      return handleClientError(response, StringConst.apiError.cancel);
    default:
      return handleClientError(response, StringConst.apiError.somethingWentWrong);
  }
}

/**
 * A generator function that calls the given API and handles the response.
 * @param {(...args: any[]) => any} api - The API to call.
 * @param {Request} payload - The payload to send to the API.
 * @param {(response: Response, payload: Request) => any} onSuccess - The function to call when the API call succeeds.
 * @param {(error: ErrorResponse, payload: Request) => any} onFailure - The function to call when the API call fails.
 * @param {ClassConstructor<Response>} responseModel - The class constructor of the response model.
 * @returns None
 */
export function* apiCall<Request, Response>(
  api: (...args: any[]) => any,
  payload: Request,
  onSuccess: (response: Response, payload: Request) => any,
  onFailure: (error: ErrorResponse, payload: Request) => any,
  responseModel: ClassConstructor<Response>
): Generator<CallEffect<unknown> | CancelledEffect, void, any> {
  try {
    const response: ApiResponse<any> = yield call(api, payload);
    if (response.ok) {
      yield* onSuccess(plainToClass<Response, any>(responseModel, { data: response.data }), payload);
    } else {
      const error: ErrorResponse = yield call(handleError, response);
      yield* onFailure(error, payload);
    }
  } catch (error: unknown) {
    // @ts-ignore
    yield* onFailure(ErrorResponse.withInitError(error.message ?? StringConst.apiError.somethingWentWrong), payload);
  } finally {
    // @ts-ignore
    if (yield cancelled()) {
      yield* onFailure(ErrorResponse.withInitError(StringConst.apiError.cancelSaga), payload);
    }
  }
}

/**
 * A generator function that calls the given api with the given payload and returns the response.
 * @param {(...args: any[]) => any} api - the api to call
 * @param {Request} payload - the payload to pass to the api
 * @param {ClassConstructor<Response>} responseModel - the model to use to create the response
 * @returns {Generator<CallEffect<unknown> | CancelledEffect, Response, ErrorResponse>}
 */
export function* apiCallWithReturn<Request, Response>(
  api: (...args: any[]) => any,
  payload: Request,
  responseModel: ClassConstructor<Response>
): Generator<CallEffect<unknown> | CancelledEffect, Response, ApiResponse<any, any> & ErrorResponse> {
  try {
    const response: ApiResponse<any> = yield call(api, payload);
    if (response.ok) {
      return plainToClass<Response, any>(responseModel, { response: response.data, payload });
    } else {
      const error: ErrorResponse = yield call(handleError, response);
      return plainToClass<Response, any>(responseModel, { error, payload });
    }
  } catch (error: unknown) {
    return plainToClass<Response, any>(responseModel, {
      // @ts-ignore
      error: ErrorResponse.withInitError(error.message ?? StringConst.apiError.somethingWentWrong),
      payload
    });
  } finally {
    // @ts-ignore
    if (yield cancelled()) {
      // eslint-disable-next-line no-unsafe-finally
      return plainToClass<Response, any>(responseModel, {
        error: ErrorResponse.withInitError(StringConst.apiError.cancelSaga),
        payload
      });
    }
  }
}
