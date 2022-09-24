import { call, put, race, take, takeLatest, type CallEffect, type CancelledEffect } from 'redux-saga/effects';

import { ToastHolder } from '@components';
import { apiCall } from '@configs';
import { SignInRequest, SuccessUserResponse, ErrorResponse } from '@models';
import { AuthActions, AppRequestActions } from '@stores-redux';
import Services from '@stores-service';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthServiceType } from '@stores-service';
import type { ApiResponse } from 'apisauce';
import type { ClassConstructor } from 'class-transformer';

const authApi: AuthServiceType = Services.authApi();

// SignIn API Call
/**
 * A generator function that handles the success case for the sign in request.
 * @param {SuccessUserResponse} response - the response from the server.
 * @returns None
 */
function* signInSuccess(response: SuccessUserResponse /*, payload: SignInRequest*/) {
  if (response.status) {
    // @ts-ignore
    yield put([AppRequestActions.changeLoading(false), AuthActions.signInSuccess(response.data)]);
    ToastHolder.toastMessage(response.data?.getProfileName ?? '');
  } else {
    const error: ErrorResponse = ErrorResponse.withInitError(response.message);
    error.setGlobalType(true);
    yield put(AppRequestActions.changeError(error));
  }
}

/**
 * A generator function that handles the failure of a sign in attempt.
 * @param {ErrorResponse} error - the error that occurred during the sign in attempt.
 * @returns None
 */
function* signInFailure(error: ErrorResponse /*, payload: SignInRequest*/) {
  error.setGlobalType(true);
  yield put(AppRequestActions.changeError(error));
}

/**
 * Sign in the user.
 * @param {AuthServiceType} api - The API service to use.
 * @param {PayloadAction<SignInRequest>} action - The action to perform.
 * @returns None
 */
function* signIn(api: AuthServiceType, { payload }: PayloadAction<SignInRequest>) {
  yield put(AppRequestActions.changeLoading(true));
  yield call<
    (
      api: (credentials: SignInRequest) => Promise<ApiResponse<SuccessUserResponse>>,
      payload: SignInRequest,
      onSuccess: (response: SuccessUserResponse, payload: SignInRequest) => any,
      onFailure: (error: ErrorResponse, payload: SignInRequest) => any,
      responseModel: ClassConstructor<SuccessUserResponse>
    ) => Generator<CallEffect<unknown> | CancelledEffect, void, any>
  >(
    apiCall<SignInRequest, SuccessUserResponse>,
    api.signIn,
    payload,
    signInSuccess,
    signInFailure,
    SuccessUserResponse
  );
}

/**
 * A generator function that watches for a sign in request and either calls the sign in function, or cancels the request.
 * @param {PayloadAction<SignInRequest>} action - The action that triggered the generator.
 * @returns None
 */
function* watchSignIn(action: PayloadAction<SignInRequest>) {
  yield race([call(signIn, authApi, action), take(AuthActions.signInRequestCancel.type)]);
}

export default [takeLatest(AuthActions.signInRequest.type, watchSignIn)];
