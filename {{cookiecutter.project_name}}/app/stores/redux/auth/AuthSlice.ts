import { createAction, createSlice, type PayloadAction, type Draft } from '@reduxjs/toolkit';

import { UserResponse, SignInRequest } from '@models';

import INITIAL_STATE from './AuthInitial';

import type { AuthStateType } from './AuthInitial';

/**
 * An action that is dispatched when the user clicks the clean button.
 * @returns None
 */
export const cleanAction = createAction<void, 'cleanAction'>('cleanAction');

/**
 * Cleans the state of the auth reducer to the initial state.
 * @param {Draft<AuthStateType>} state - the state to clean
 * @returns None
 */
function cleanSuccess(state: Draft<AuthStateType>): void {
  state.user = INITIAL_STATE.user;
}

/**
 * A reducer for the sign in request action.
 * @param {Draft<AuthStateType>} _state - The current state of the auth reducer.
 * @param {PayloadAction<SignInRequest | undefined>} _action - The action to handle.
 * @returns None
 */
function signInRequest(_state: Draft<AuthStateType>, _action: PayloadAction<SignInRequest | undefined>): void {}
/**
 * A function that cancels the sign in request.
 * @returns None
 */
function signInRequestCancel(): void {}
/**
 * Updates the user state with the user response from the server.
 * @param {Draft<AuthStateType>} state - The current state of the application.
 * @param {PayloadAction<UserResponse | undefined>} action - The action to be performed.
 * @returns None
 */
function signInSuccess(state: Draft<AuthStateType>, action: PayloadAction<UserResponse | undefined>): void {
  state.user = action.payload;
}

/**
 * Creating a auth slice of the redux store
 * @param {AuthStateType} state - The current state of the auth reducer.
 * @param {Action} action - The action to handle.
 * @returns {AuthStateType} The new state of the auth reducer.
 */
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

/* Exporting the reducer function that will be used in the root reducer. */
export const AuthReducer = authSlice.reducer;
/**
 * Creates an object with all of the actions for the auth slice.
 * @returns {Object} - An object with all of the actions for the auth slice.
 */
export const AuthActions = authSlice.actions;
