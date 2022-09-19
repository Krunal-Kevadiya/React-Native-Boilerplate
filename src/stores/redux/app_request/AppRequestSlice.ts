import { createSlice, type PayloadAction, type Draft } from '@reduxjs/toolkit';

import { ErrorResponse } from '@models';

import { cleanAction } from '../auth';

import INITIAL_STATE from './AppRequestInitial';

import type { AppRequestStateType } from './AppRequestInitial';

/**
 * Cleans the state of the app request state.
 * @param {Draft<AppRequestStateType>} state - the state to clean
 * @returns None
 */
function cleanSuccess(state: Draft<AppRequestStateType>): void {
  state.loading = INITIAL_STATE.loading;
  state.error = INITIAL_STATE.error;
}

/**
 * Changes the loading state of the app.
 * @param {Draft<AppRequestStateType>} state - the state of the app.
 * @param {PayloadAction<boolean>} action - the action to change the loading state of the app.
 * @returns None
 */
function changeLoading(state: Draft<AppRequestStateType>, action: PayloadAction<boolean>): void {
  state.loading = action.payload;
}

/**
 * Changes the error state of the app request state.
 * @param {Draft<AppRequestStateType>} state - the app request state to change
 * @param {PayloadAction<ErrorResponse | undefined>} action - the action to change the state with
 * @returns None
 */
function changeError(state: Draft<AppRequestStateType>, action: PayloadAction<ErrorResponse | undefined>): void {
  state.error = action.payload ?? undefined;
  state.loading = false;
}

/**
 * Connects to the socket server.
 * @returns None
 */
function connectSocket(): void {}
/**
 * Disconnects the socket.
 * @returns None
 */
function disconnectSocket(): void {}

/**
 * Creating a appRequest slice of the redux store
 * @param {AppRequestStateType} state - The current state of the appRequest reducer.
 * @param {Action} action - The action to handle.
 * @returns {AppRequestStateType} The new state of the appRequest reducer.
 */
const appRequestSlice = createSlice({
  name: 'appRequest',
  initialState: INITIAL_STATE,
  reducers: {
    changeError,
    changeLoading,
    connectSocket,
    disconnectSocket
  },
  extraReducers: (builder) => {
    builder.addCase(cleanAction, cleanSuccess);
  }
});

/* Exporting the reducer function that will be used in the root reducer. */
export const AppRequestReducer = appRequestSlice.reducer;

/**
 * Creates an object with all of the actions for the appRequest slice.
 * @returns {Object} - An object with all of the actions for the appRequest slice.
 */
export const AppRequestActions = appRequestSlice.actions;
