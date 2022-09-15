import apisauce, { type ApiResponse, type ApisauceInstance, CancelToken } from 'apisauce';
import { type ClassConstructor, plainToClass } from 'class-transformer';
import has from 'lodash/has';
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

export function apiConfig(baseURL: string): ApisauceInstance {
  return apisauce.create({
    baseURL,
    timeout: 120000,
    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' }
  });
}

export function apiWithCancelToken<Response>(
  api: ApisauceInstance,
  method: Method,
  url: string,
  params?: {},
  data?: unknown,
  setting?: {}
): Promise<ApiResponse<Response, Response>> {
  const httpMethod: string = method.toLowerCase();

  const hasData: boolean = ['post', 'put', 'patch'].indexOf(httpMethod) >= 0;
  const source = CancelToken.source();
  const settings = setting || {};

  // @ts-ignore
  settings.cancelToken = source.token;

  const request: Promise<ApiResponse<Response, Response>> = hasData
    ? // @ts-ignore
      api[httpMethod](url, data, settings)
    : // @ts-ignore
      api[httpMethod](url, params, settings);

  // @ts-ignore
  request[CANCEL] = () => source.cancel();

  return request;
}

function handleClientError(response: any, defaultMessage: string | undefined = undefined): ErrorResponse {
  const { message, status = false, statusText = 'Error' } = response.data ?? {};
  const messages = message ?? defaultMessage ?? StringConst.apiError.somethingWentWrong;
  return ErrorResponse.withInit(response.status, status, messages, statusText);
}

async function getError(response: any): Promise<ErrorResponse> {
  if (['TIMEOUT_ERROR', 'NETWORK_ERROR'].includes(response?.problem)) {
    return handleClientError(response, StringConst.apiError.network);
  }
  if (['CONNECTION_ERROR', 'SERVER_ERROR'].includes(response?.problem)) {
    return handleClientError(response, StringConst.apiError.server);
  }
  return handleClientError(response);
}

function isValidResponse(response: any): boolean {
  return has(response, 'data.status') ? response?.data.status : response?.status >= 200 && response?.status < 300;
}

function* handleResponse<Request, Response>(
  response: any,
  payload: Request,
  onSuccess: (response: Response, payload: Request) => [],
  onFailure: (error: ErrorResponse, payload: Request) => [],
  responseModel: ClassConstructor<Response>
): Generator<CallEffect<ErrorResponse>, void, any> {
  if (isValidResponse(response)) {
    yield* onSuccess(plainToClass<Response, any>(responseModel, { status: true, data: response.data }), payload);
  } else {
    const error: ErrorResponse = yield call(getError, response);
    yield* onFailure(error, payload);
  }
}

export function* apiCall<Request, Response>(
  api: any,
  payload: Request,
  onSuccess: (response: Response, payload: Request) => any,
  onFailure: (error: ErrorResponse, payload: Request) => any,
  responseModel: ClassConstructor<Response>
): Generator<CallEffect<unknown> | CancelledEffect, void, any> {
  try {
    const response: unknown = yield call(api, payload);
    yield* handleResponse<Request, Response>(response, payload, onSuccess, onFailure, responseModel);
  } catch (error: any) {
    yield* onFailure(ErrorResponse.withInitError(error.message ?? StringConst.apiError.somethingWentWrong), payload);
  } finally {
    if (yield cancelled()) {
      yield* onFailure(ErrorResponse.withInitCancel(StringConst.apiError.cancelSaga), payload);
    }
  }
}

export function* apiCallWithReturn<Request, Response>(
  api: any,
  payload: Request,
  responseModel: ClassConstructor<Response>
): Generator<CallEffect<unknown> | CancelledEffect, Response, ErrorResponse> {
  try {
    const response: unknown = yield call(api, payload);
    if (isValidResponse(response)) {
      const data: any = (response as any).data;
      return plainToClass<Response, any>(responseModel, { response: data, payload });
    }
    const error: ErrorResponse = yield call(getError, response);
    return plainToClass<Response, any>(responseModel, { error, payload });
  } catch (error: any) {
    return plainToClass<Response, any>(responseModel, {
      error: ErrorResponse.withInitError(error.message ?? StringConst.apiError.somethingWentWrong),
      payload
    });
  } finally {
    if (yield cancelled()) {
      // eslint-disable-next-line no-unsafe-finally
      return plainToClass<Response, any>(responseModel, {
        error: ErrorResponse.withInitCancel(StringConst.apiError.cancelSaga),
        payload
      });
    }
  }
}
