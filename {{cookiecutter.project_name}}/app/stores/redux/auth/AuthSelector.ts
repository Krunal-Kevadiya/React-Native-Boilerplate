import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { UserResponse } from '@models';
import type { AuthStateType } from './AuthInitial';
import type { RootStateType } from '@stores-redux';

/**
 * Gets the user from the local state.
 * @param {RootStateType} state - the state of the application
 * @returns {UserResponse | undefined} - the user from the local state, or undefined if the user is not logged in
 */
const getLocalUser = (state: RootStateType): UserResponse | undefined => state.auth.user;

/**
 * A type that contains all the selectors for the auth state.
 * @typedef {Object} AuthSelectorsType
 * @property {(state: RootStateType) => AuthStateType} getAuth - The selector for the auth state.
 * @property {(state: RootStateType) => UserResponse | undefined} getUser - The selector for the user.
 */
type AuthSelectorsType = {
  getAuth: (state: RootStateType) => AuthStateType;
  getUser: (state: RootStateType) => UserResponse;
};

/**
 * A type that contains the selectors for the auth state.
 * @type {AuthSelectorsType}
 */
const AuthSelectors: AuthSelectorsType = {
  getAuth: (state: RootStateType): AuthStateType => state.auth,
  getUser: createDraftSafeSelector(getLocalUser, (user: UserResponse | undefined) =>
    UserResponse.withInitPlainObject(user)
  )
};

export default AuthSelectors;
