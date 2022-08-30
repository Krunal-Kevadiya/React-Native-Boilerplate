import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { ErrorResponse } from '@models';
import type { AppRequestStateType } from './AppRequestInitial';
import type { RootStateType } from '@stores-redux';

const getAppRequest = (state: RootStateType): AppRequestStateType => state.appRequest;
const getLocalLoading = (state: RootStateType): boolean => state.appRequest.loading;
const getLocalError = (state: RootStateType): ErrorResponse | undefined => state.appRequest.error;

const getLoading = createDraftSafeSelector(getLocalLoading, (loading: boolean) => loading);
const getError = createDraftSafeSelector(getLocalError, (error: ErrorResponse | undefined) =>
  ErrorResponse.withInitPlainObject(error)
);

type AppRequestSelectorsType = {
  getAppRequest: (state: RootStateType) => AppRequestStateType;
  getLoading: (state: RootStateType) => boolean;
  getError: (state: RootStateType) => ErrorResponse;
};

const AppRequestSelectors: AppRequestSelectorsType = {
  getAppRequest,
  getLoading,
  getError
};

export default AppRequestSelectors;
