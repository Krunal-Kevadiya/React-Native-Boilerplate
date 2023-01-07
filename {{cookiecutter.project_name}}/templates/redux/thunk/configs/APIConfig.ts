import { createAsyncThunk, type AsyncThunk } from '@reduxjs/toolkit';
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
import axios, { type AxiosRequestConfig, type CancelTokenSource, type Method } from 'axios';
import { plainToClass, type ClassConstructor } from 'class-transformer';
import isEmpty from 'lodash/isEmpty';
import { StringConst, AppConst } from '@constants';
import { ErrorResponse } from '@models';
import { formatString } from '@utils';
import type {
  AsyncThunkFulfilledActionCreator,
  AsyncThunkRejectedActionCreator
} from '@reduxjs/toolkit/dist/createAsyncThunk';

/**
 * `ApiConfig` is an object with a required `api` property of type `ApisauceInstance`, a required
 * `method` property of type `Method`, a required `url` property of type `string`, an optional `data`
 * property of type `any`, an optional `params` property of type `Record<string, any>`, and an optional
 * `setting` property of type `Record<string, any>`.
 * @property {ApisauceInstance} api - The Apisauce instance that will be used to make the request.
 * @property {Method} method - The HTTP method to use.
 * @property {string} url - The url of the endpoint you're trying to hit.
 * @property {Record<string, any>} data - The data to be sent to the server.
 * @property {Record<string, any>} params - The query parameters to be sent with the request.
 * @property {AxiosRequestConfig<any>} setting - This is an object that contains the following properties:
 * @property {Record<string, any>} paths - The path query parameters to be set with the url.
 */
type ApiConfig = {
  api: ApisauceInstance;
  method: Method;
  url: string;
  data?: Record<string, any>;
  params?: Record<string, any>;
  setting?: AxiosRequestConfig<any>;
  paths?: Record<string, any>;
};

/**
 * `ThunkArg` is an object with optional properties `data`, `params`, and `setting`.
 * @property {Record<string, any>} data - The data that is passed to the thunk.
 * @property {Record<string, any>} params - The params object is used to pass in any parameters that are needed to make the
 * request.
 * @property {AxiosRequestConfig<any>} setting - This is the setting object that is passed to the action.
 * @property {Record<string, any>} paths - The path query parameters to be set with the url.
 */
export type ThunkArg =
  | Partial<{
      data: Record<string, any>;
      params: Record<string, any>;
      setting: AxiosRequestConfig<any>;
      paths: Record<string, any>;
    }>
  | undefined;

/**
 * `ThunkApiConfig` is an object with a property named `rejectValue` whose value is an `ErrorResponse`.
 * @property {ErrorResponse} rejectValue - The value that will be returned when the promise is
 * rejected.
 */
export type ThunkApiConfig = { rejectValue: ErrorResponse };

export type APIDispatch<Returned> = Promise<
  | ReturnType<AsyncThunkFulfilledActionCreator<Returned, ThunkArg>>
  | ReturnType<AsyncThunkRejectedActionCreator<ThunkArg, ThunkApiConfig>>
> & {
  abort: (reason?: string) => void;
  requestId: string;
  arg: ThunkArg;
  unwrap: () => Promise<Returned>;
};

/**
 * It creates an Apisauce instance with a base URL and some headers
 * @param {string} baseURL - The base URL of the API.
 * @returns {ApisauceInstance} - The API instance
 */
function apiConfig(baseURL: string): ApisauceInstance {
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
 * @param {ApiConfig} config - the config for the request
 * @param {CancelTokenSource} source - the cancel token source for the request
 * @returns {Promise<ApiResponse<Response>>} - the response from the API
 */
function apiWithCancelToken<Response>(
  { api, method, url, params, data, setting, paths }: ApiConfig,
  source: CancelTokenSource
): Promise<ApiResponse<Response, ErrorResponse>> {
  const httpMethod: string = method.toLowerCase();

  const hasData: boolean = ['post', 'put', 'patch'].indexOf(httpMethod) >= 0;
  const settings = setting || {};

  // @ts-ignore
  settings.cancelToken = source.token;
  let finalUrl = url;
  if (!isEmpty(paths)) {
    finalUrl = formatString(finalUrl, paths);
  }
  const request: Promise<ApiResponse<Response, ErrorResponse>> = hasData
    ? // @ts-ignore
      api[httpMethod](finalUrl, data, settings)
    : // @ts-ignore
      api[httpMethod](finalUrl, params, settings);

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
 * It takes an `ApiOkResponse<any>` and returns an `ErrorResponse`
 * @param response - ApiOkResponse<any>
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
 * It creates an async thunk that uses a cancel token to cancel the request if the user navigates away
 * from the page
 * @param {string} typePrefix - The prefix for the thunk type.
 * @param {Method} method - Method - the HTTP method to use (GET, POST, PUT, DELETE, etc)
 * @param {string} url - The url of the endpoint.
 * @param {ClassConstructor<Response>} responseModel - The type of response model to use.
 * @param {ApisauceInstance} api - The API instance to use and default value is authorizedAPI
 * @returns {AsyncThunk<Response, ThunkArg, ThunkApiConfig>} - The async thunk action state.
 */
export function createAsyncThunkWithCancelToken<Response>(
  typePrefix: string,
  method: Method,
  url: string,
  responseModel: ClassConstructor<Response>,
  api: ApisauceInstance = authorizedAPI
): AsyncThunk<Response, ThunkArg, ThunkApiConfig> {
  return createAsyncThunk<Response, ThunkArg, ThunkApiConfig>(
    typePrefix,
    async (payload, thunkApi) => {
      const { data, params, setting, paths } = payload ?? {};
      const source = CancelToken.source();

      // @ts-ignore
      thunkApi.signal.addEventListener('abort', () => {
        source.cancel();
      });
      try {
        const response: ApiResponse<Response, ErrorResponse> = await apiWithCancelToken<Response>(
          { api, method, url, data, params, setting, paths },
          source
        );
        if (response.ok) {
          if (response.status === 200) {
            return plainToClass<Response, any>(responseModel, {
              ...response.data,
              status: response.status
            });
          } else {
            return thunkApi.rejectWithValue(handleSuccessError(response));
          }
        } else {
          return thunkApi.rejectWithValue(handleError(response));
        }
      } catch (error: unknown) {
        return thunkApi.rejectWithValue(handleCatchError(error));
      }
    }
  );
}
