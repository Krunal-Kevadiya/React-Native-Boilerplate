import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { UserResponse } from '@models';
import type { AuthStateType } from './AuthInitial';
import type { RootStateType } from '@stores-redux';

const getAuth = (state: RootStateType): AuthStateType => state.auth;

const getLocalUser = (state: RootStateType): UserResponse | undefined => state.auth.user;

const getUser = createDraftSafeSelector(getLocalUser, (user: UserResponse | undefined) =>
  UserResponse.withInitPlainObject(user)
);

type AuthSelectorsType = {
  getAuth: (state: RootStateType) => AuthStateType;
  getUser: (state: RootStateType) => UserResponse;
};

const AuthSelectors: AuthSelectorsType = {
  getAuth,
  getUser
};

export default AuthSelectors;
