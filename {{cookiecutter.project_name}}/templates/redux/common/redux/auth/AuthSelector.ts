import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { UserResponse, ErrorResponse } from '@models';
import type { RootStateType } from '../Store';
import type { AuthStateType } from './AuthInitial';

/**
 * Gets the user from the local state.
 * @param {RootStateType} state - the state of the application
 * @returns {UserResponse | undefined} - the user from the local state, or undefined if the user is not logged in
 */
const getLocalUser = (state: RootStateType): UserResponse | undefined => state.auth.user;
/**
 * Gets the error from the state.
 * @param {RootStateType} state - the state object
 * @returns {ErrorResponse | undefined} - the error object, if there is one.
 */
const getLocalError = (state: RootStateType): ErrorResponse | undefined => state.auth.error;

/**
 * A type that contains all the selectors for the auth state.
 * @typedef {Object} AuthSelectorsType
 * @property {(state: RootStateType) => AuthStateType} getAuth - The selector for the auth state.
 * @property {(state: RootStateType) => boolean} getLoading - The selector for the loading state.
 * @property {(state: RootStateType) => ErrorResponse} getError - The selector for the error state.
 * @property {(state: RootStateType) => UserResponse | undefined} getUser - The selector for the user.
 */
type AuthSelectorsType = {
  getAuth: (state: RootStateType) => AuthStateType;
  getLoading: (state: RootStateType) => boolean;
  getError: (state: RootStateType) => ErrorResponse;
  getUser: (state: RootStateType) => UserResponse;
};

/**
 * A type that contains the selectors for the auth state.
 * @type {AuthSelectorsType}
 */
const AuthSelectors: AuthSelectorsType = {
  getAuth: (state: RootStateType): AuthStateType => state.auth,
  getLoading: (state: RootStateType): boolean => state.auth.loading,
  getError: createDraftSafeSelector(getLocalError, (error: ErrorResponse | undefined) =>
    ErrorResponse.withInitPlainObject(error)
  ),
  getUser: createDraftSafeSelector(getLocalUser, (user: UserResponse | undefined) =>
    UserResponse.withInitPlainObject(user)
  )
};

export default AuthSelectors;
