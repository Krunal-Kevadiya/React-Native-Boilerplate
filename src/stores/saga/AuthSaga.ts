import { call, type CallEffect, type CancelledEffect, put, race, take, takeLatest } from 'redux-saga/effects';
import { ToastHolder } from '@components';
import { apiCall } from '@configs';
import { SignInRequest, SuccessUserResponse, ErrorResponse } from '@models';
import { AuthActions, AppRequestActions } from '@stores-redux';
import Services from '@stores-service';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthServiceType } from '@stores-service';
import type { ClassConstructor } from 'class-transformer';

const authApi: AuthServiceType = Services.authApi();

// SignIn API Call
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

function* signInFailure(error: ErrorResponse /*, payload: SignInRequest*/) {
  error.setGlobalType(true);
  yield put(AppRequestActions.changeError(error));
}

function* signIn(api: AuthServiceType, { payload }: PayloadAction<SignInRequest>) {
  yield put(AppRequestActions.changeLoading(true));
  yield call<
    (
      api: any,
      payload: SignInRequest,
      onSuccess: (response: SuccessUserResponse, payload: SignInRequest) => any,
      onFailure: (error: ErrorResponse, payload: SignInRequest) => any,
      responseModel: ClassConstructor<SuccessUserResponse>
    ) => Generator<CallEffect<unknown> | CancelledEffect, void, any>
  >(apiCall, api.signIn, payload, signInSuccess, signInFailure, SuccessUserResponse);
}

function* watchSignIn(action: PayloadAction<SignInRequest>) {
  yield race([call(signIn, authApi, action), take(AuthActions.signInRequestCancel.type)]);
}

export default [takeLatest(AuthActions.signInRequest.type, watchSignIn)];
