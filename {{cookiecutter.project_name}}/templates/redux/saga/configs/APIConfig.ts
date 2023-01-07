import {
  CancelToken,
  CANCEL_ERROR,
  CLIENT_ERROR,
  CONNECTION_ERROR,
  create,
  NETWORK_ERROR,
  SERVER_ERROR,
  TIMEOUT_ERROR,
  type ApiErrorResponse,
  type ApiOkResponse,
  type ApiResponse,
  type ApisauceInstance
} from 'apisauce';
import axios, { type AxiosRequestConfig, type Method } from 'axios';
import { plainToClass, type ClassConstructor } from 'class-transformer';
import isEmpty from 'lodash/isEmpty';
import { CANCEL } from 'redux-saga';
import { call, type CallEffect, cancelled, type CancelledEffect } from 'redux-saga/effects';
import { StringConst, AppConst } from '@constants';
import { ErrorResponse } from '@models';
import { formatString } from '@utils';

/**
 * It creates an Apisauce instance with a base URL and some headers
 * @param {string} baseURL - The base URL of the API.
 * @returns {ApisauceInstance} - The API instance
 */
export function apiConfig(baseURL: string): ApisauceInstance {
  return create({
    baseURL,
    timeout: 120000,
    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' }
  });
}

/**
 * Creating two instances of the API. One is authorized and the other is unauthorized.
 * An Apisauce instance with the correct base URL and headers.
 * @param {string} baseURL - the base URL for the API
 * @returns {ApisauceInstance} - the Apisauce instance
 */
export const authorizedAPI: ApisauceInstance = apiConfig(AppConst.apiUrl);
export const unauthorizedAPI: ApisauceInstance = apiConfig(AppConst.apiUrl);

/**
 * Set the headers for the authorized API.
 * @param {Record<string, any>} headers - the headers to set for the authorized API.
 * @returns None
 */
export function setHeaders(headers: Record<string, any>): void {
  authorizedAPI.setHeaders(headers);
}

/**
 * Adds an async request transform to the authorized API.
 * @param {Function} transform - the transform to add to the authorized API.
 * @returns None
 */
authorizedAPI.addAsyncRequestTransform(async (request) => {
  // eslint-disable-next-line no-restricted-syntax
  console.log({ request });

  // TODO: You can add authorization token like below
  // const state = reduxStore?.store?.getState();
  // const authToken = state?.auth?.loginData?.access_token;
  // const token = `Bearer ${authToken}`;
  // request.headers.Authorization = token;
});

/**
 * Monitor/Logs the response from an API call.
 * @param {ApiResponse<any>} response - the response from the API call.
 * @returns None
 */
function APIMonitor(response: ApiResponse<any>) {
  // eslint-disable-next-line no-restricted-syntax
  console.log({ response });
}
authorizedAPI.addMonitor(APIMonitor);
unauthorizedAPI.addMonitor(APIMonitor);

/**
 * Takes in an API response and transforms it into a usable format.
 * It will clear the async storage and redirect to the welcome screen if the response status is 401
 * @param {ApiResponse<any>} response - the API response to transform
 * @returns None
 */
async function asyncResponseTransform(response: ApiResponse<any>) {
  // eslint-disable-next-line no-restricted-syntax
  console.log({ response });

  // TODO: You can add global condition for token expired or internet issue like below
  // if (response.status === 401) {
  //   AsyncStorage.clear();
  //   reset({ index: 0, routes: [{ name: 'WelcomeScreen' }] });
  // } else if (['TIMEOUT_ERROR', 'CONNECTION_ERROR', 'CANCEL_ERROR'].includes(response.problem ?? '')) {
  //   showToast('Please check your internet connectivity.', 'error');
  // }
}
authorizedAPI.addAsyncResponseTransform(asyncResponseTransform);
unauthorizedAPI.addAsyncResponseTransform(asyncResponseTransform);

/**
 * Makes a request to the API with the given config.
 * A function that takes in an object with an api, method, url, params, data, and setting
 * property. It also takes in a source parameter.
 * @property {ApisauceInstance} api - The Apisauce instance that will be used to make the request.
 * @property {Method} method - The HTTP method to use.
 * @property {string} url - The url of the endpoint you're trying to hit.
 * @property {any} data - The data to be sent to the server.
 * @property {Record<string, any>} params - The query parameters to be sent with the request.
 * @property {AxiosRequestConfig<any>} setting - This is an object that contains the following properties:
 * @property {Record<string, any>} paths - The path query parameters to be set with the url.
 * @returns {Promise<ApiResponse<Response>>} - the response from the API
 */
export function apiWithCancelToken<Response>(
  api: ApisauceInstance,
  method: Method,
  url: string,
  args?: Partial<{
    data: Record<string, any>;
    params: Record<string, any>;
    setting: AxiosRequestConfig<any>;
    paths: Record<string, any>;
  }>
): Promise<ApiResponse<Response, ErrorResponse>> {
  const httpMethod: string = method.toLowerCase();

  const hasData: boolean = ['post', 'put', 'patch'].indexOf(httpMethod) >= 0;
  const source = CancelToken.source();
  const settings = args?.setting || {};

  // @ts-ignore
  settings.cancelToken = source.token;
  let finalUrl = url;
  if (!isEmpty(args?.paths)) {
    finalUrl = formatString(finalUrl, args!.paths);
  }

  const request: Promise<ApiResponse<Response, ErrorResponse>> = hasData
    ? // @ts-ignore
      api[httpMethod](finalUrl, args?.data, settings)
    : // @ts-ignore
      api[httpMethod](finalUrl, args?.params, settings);

  // @ts-ignore
  request[CANCEL] = () => source.cancel();

  return request;
}

/**
 * Handles the error response from the API.
 * @param {ApiErrorResponse<ErrorResponse>} response - the error response from the API.
 * @param {string} defaultMessage - the default message to display if the response does not
 * contain a message.
 * @returns {ErrorResponse} - the error response to be displayed.
 */
function handleClientError(
  response: ApiErrorResponse<ErrorResponse>,
  defaultMessage: string
): ErrorResponse {
  const { message } = response.data ?? {};
  if (axios.isCancel(response)) {
    return ErrorResponse.withInit(response.status, message ?? response.message ?? defaultMessage);
  } else if (axios.isAxiosError(response)) {
    return ErrorResponse.withInit(response.status, message ?? response.message ?? defaultMessage);
  } else {
    return ErrorResponse.withInit(response.status, message ?? defaultMessage);
  }
}

/**
 * Handles the error response from the API.
 * @param {ApiErrorResponse<ErrorResponse>} response - the error response from the API.
 * @param {string} defaultMessage - the default message to display if the error response is
 * not handled.
 * @returns {ErrorResponse} - the error response to display.
 */
function handleError(response: ApiErrorResponse<ErrorResponse>): ErrorResponse {
  switch (response.problem) {
    case CLIENT_ERROR:
      return handleClientError(response, StringConst.ApiError.client);
    case SERVER_ERROR:
      return handleClientError(response, StringConst.ApiError.server);
    case TIMEOUT_ERROR:
      return handleClientError(response, StringConst.ApiError.timeout);
    case CONNECTION_ERROR:
      return handleClientError(response, StringConst.ApiError.connection);
    case NETWORK_ERROR:
      return handleClientError(response, StringConst.ApiError.network);
    case CANCEL_ERROR:
      return handleClientError(response, StringConst.ApiError.cancel);
    default:
      return handleClientError(response, StringConst.ApiError.somethingWentWrong);
  }
}

/**
 * It takes an `ApiOkResponse<ErrorResponse>` and returns an `ErrorResponse`
 * @param response - ApiOkResponse<ErrorResponse>
 * @returns ErrorResponse
 */
function handleSuccessError(response: ApiOkResponse<any>): ErrorResponse {
  const { message } = response.data ?? {};
  const messages = message ?? StringConst.ApiError.somethingWentWrong;
  return ErrorResponse.withInit(response.status, messages);
}

/**
 * Handles errors that occur when making API calls.
 * @param {unknown} error - unknown - This is the error that is thrown by the API.
 * @returns {ErrorResponse} - The error response object.
 */
function handleCatchError(error: unknown): ErrorResponse {
  if (axios.isCancel(error)) {
    return ErrorResponse.withInitError(error.message);
  } else if (axios.isAxiosError(error)) {
    return ErrorResponse.withInit(error.status, error.message);
  } else {
    return ErrorResponse.withInitError(StringConst.ApiError.unexpected);
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
      if (response.status === 200) {
        yield* onSuccess(
          plainToClass<Response, any>(responseModel, {
            ...response.data,
            status: response.status
          }),
          payload
        );
      } else {
        yield* onFailure(handleSuccessError(response), payload);
      }
    } else {
      yield* onFailure(handleError(response), payload);
    }
  } catch (error: unknown) {
    // @ts-ignore
    yield* onFailure(handleCatchError(error), payload);
  } finally {
    // @ts-ignore
    if (yield cancelled()) {
      yield* onFailure(ErrorResponse.withInitError(StringConst.ApiError.cancelSaga), payload);
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
): Generator<
  CallEffect<unknown> | CancelledEffect,
  Response,
  ApiResponse<any, any> & ErrorResponse
> {
  try {
    const response: ApiResponse<any> = yield call(api, payload);
    if (response.ok) {
      if (response.status === 200) {
        return plainToClass<Response, any>(responseModel, {
          response: {
            ...response.data,
            status: response.status
          },
          payload
        });
      } else {
        return plainToClass<Response, any>(responseModel, {
          error: handleSuccessError(response),
          payload
        });
      }
    } else {
      return plainToClass<Response, any>(responseModel, { error: handleError(response), payload });
    }
  } catch (error: unknown) {
    return plainToClass<Response, any>(responseModel, {
      error: handleCatchError(error),
      payload
    });
  } finally {
    // @ts-ignore
    if (yield cancelled()) {
      // eslint-disable-next-line no-unsafe-finally
      return plainToClass<Response, any>(responseModel, {
        error: ErrorResponse.withInitError(StringConst.ApiError.cancelSaga),
        payload
      });
    }
  }
}
