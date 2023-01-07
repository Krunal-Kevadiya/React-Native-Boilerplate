import {
  call,
  put,
  race,
  take,
  takeLatest,
  type CallEffect,
  type CancelledEffect
} from 'redux-saga/effects';
import { apiCall } from '@configs';
import { SignInRequest, UserResponse, ErrorResponse } from '@models';
import { AuthActions } from '@redux';
import Services, { type AuthServiceType } from '@services';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ApiResponse } from 'apisauce';
import type { ClassConstructor } from 'class-transformer';

const authApi: AuthServiceType = Services.authApi();

// SignIn API Call
/**
 * A generator function that handles the success case for the sign in request.
 * @param {UserResponse} response - the response from the server.
 * @returns None
 */
function* signInSuccess(response: UserResponse /*, payload: SignInRequest*/) {
  yield put(AuthActions.signInSuccess(response));
}

/**
 * A generator function that handles the failure of a sign in attempt.
 * @param {ErrorResponse} error - the error that occurred during the sign in attempt.
 * @returns None
 */
function* signInFailure(error: ErrorResponse /*, payload: SignInRequest*/) {
  error.setGlobalType(true);
  yield put(AuthActions.signInFailure(error));
}

/**
 * Sign in the user.
 * @param {AuthServiceType} api - The API service to use.
 * @param {PayloadAction<Record<string, any>>} action - The action to perform.
 * @returns None
 */
function* signIn(api: AuthServiceType, { payload }: PayloadAction<SignInRequest>) {
  yield call<
    (
      api: (credentials: SignInRequest) => Promise<ApiResponse<UserResponse, ErrorResponse>>,
      payload: SignInRequest,
      onSuccess: (response: UserResponse, payload: SignInRequest) => any,
      onFailure: (error: ErrorResponse, payload: SignInRequest) => any,
      responseModel: ClassConstructor<UserResponse>
    ) => Generator<CallEffect<unknown> | CancelledEffect, void, any>
  >(
    apiCall<SignInRequest, UserResponse>,
    api.signIn,
    payload,
    signInSuccess,
    signInFailure,
    UserResponse
  );
}

/**
 * A generator function that watches for a sign in request and either calls the sign in function, or cancels the request.
 * @param {PayloadAction<SignInRequest>} action - The action that triggered the generator.
 * @returns None
 */
function* watchSignIn(action: PayloadAction<SignInRequest>) {
  yield race([call(signIn, authApi, action), take(AuthActions.signInRequestCancel.toString())]);
}

export default [takeLatest(AuthActions.signInRequest.toString(), watchSignIn)];
