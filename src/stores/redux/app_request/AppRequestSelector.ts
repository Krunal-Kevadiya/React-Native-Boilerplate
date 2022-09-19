import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { ErrorResponse } from '@models';

import type { AppRequestStateType } from './AppRequestInitial';
import type { RootStateType } from '@stores-redux';

/**
 * Gets the error from the state.
 * @param {RootStateType} state - the state object
 * @returns {ErrorResponse | undefined} - the error object, if there is one.
 */
const getLocalError = (state: RootStateType): ErrorResponse | undefined => state.appRequest.error;

/**
 * A type that contains the selectors for the AppRequest reducer.
 * @typedef {Object} AppRequestSelectorsType
 * @property {(state: RootStateType) => AppRequestStateType} getAppRequest - The selector for the AppRequest reducer.
 * @property {(state: RootStateType) => boolean} getLoading - The selector for the loading state.
 * @property {(state: RootStateType) => ErrorResponse} getError - The selector for the error state.
 */
type AppRequestSelectorsType = {
  getAppRequest: (state: RootStateType) => AppRequestStateType;
  getLoading: (state: RootStateType) => boolean;
  getError: (state: RootStateType) => ErrorResponse;
};

/**
 * A type that contains the selectors for the AppRequest reducer.
 * @type {AppRequestSelectorsType}
 */
const AppRequestSelectors: AppRequestSelectorsType = {
  getAppRequest: (state: RootStateType): AppRequestStateType => state.appRequest,
  getLoading: (state: RootStateType): boolean => state.appRequest.loading,
  getError: createDraftSafeSelector(getLocalError, (error: ErrorResponse | undefined) =>
    ErrorResponse.withInitPlainObject(error)
  )
};

export default AppRequestSelectors;
