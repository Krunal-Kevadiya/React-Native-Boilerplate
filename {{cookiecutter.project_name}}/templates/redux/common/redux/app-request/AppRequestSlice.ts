import {
  createSlice,
  createAction,
  type Draft,
  type ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import INITIAL_STATE, { type AppRequestStateType } from './AppRequestInitial';

/**
 * An action that is dispatched when the user clicks the sign out button.
 * @returns None
 */
export const cleanAction = createAction<void, 'cleanAction'>('cleanAction');

/**
 * An action that is dispatched when the clear error.
 * @returns None
 */
export const cleanErrorAction = createAction<boolean, 'cleanErrorAction'>('cleanErrorAction');

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
    connectSocket: () => {},
    disconnectSocket: () => {}
  },
  extraReducers: (builder: ActionReducerMapBuilder<AppRequestStateType>) => {
    builder
      .addCase(cleanAction, (_state: Draft<AppRequestStateType>) => {})
      .addCase(cleanErrorAction, (_state: Draft<AppRequestStateType>) => {});
  }
});

/* Exporting the reducer function that will be used in the root reducer. */
export const AppRequestReducer = appRequestSlice.reducer;

/**
 * Creates an object with all of the actions for the appRequest slice.
 * @returns {Object} - An object with all of the actions for the appRequest slice.
 */
export const AppRequestActions = { ...appRequestSlice.actions, cleanAction, cleanErrorAction };
