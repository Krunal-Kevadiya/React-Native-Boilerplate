import { createAction, createSlice, type PayloadAction, type Draft } from '@reduxjs/toolkit';

import { UserResponse, SignInRequest } from '@models';

import INITIAL_STATE from './AuthInitial';

import type { AuthStateType } from './AuthInitial';

export const cleanAction = createAction<void, 'cleanAction'>('cleanAction');

function cleanSuccess(state: Draft<AuthStateType>): void {
  state.user = INITIAL_STATE.user;
}

function signInRequest(_state: Draft<AuthStateType>, _action: PayloadAction<SignInRequest | undefined>): void {}
function signInRequestCancel(): void {}
function signInSuccess(state: Draft<AuthStateType>, action: PayloadAction<UserResponse | undefined>): void {
  state.user = action.payload;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    signInSuccess,
    signInRequest,
    signInRequestCancel
  },
  extraReducers: (builder) => {
    builder.addCase(cleanAction, cleanSuccess);
  }
});

export const AuthReducer = authSlice.reducer;
export const AuthActions = authSlice.actions;
