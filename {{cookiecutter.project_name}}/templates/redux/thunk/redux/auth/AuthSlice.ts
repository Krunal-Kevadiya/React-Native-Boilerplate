import {
  createSlice,
  type ActionReducerMapBuilder,
  type Draft,
  type PayloadAction
} from '@reduxjs/toolkit';
import { createAsyncThunkWithCancelToken, unauthorizedAPI } from '@configs';
import { APIConst, ToolkitActionConst } from '@constants';
import { ErrorResponse, UserResponse } from '@models';
import { AppRequestActions } from '../app-request';
import INITIAL_STATE, { type AuthStateType } from './AuthInitial';

/**
 * Creates an async thunk action creator that will dispatch actions to the reducer and will sign in the user.
 * @param {string} [typePrefix='auth/signIn'] - The prefix for the thunk type.
 * @param {Method} [method='post'] - Method - the HTTP method to use POST.
 * @param {string} [url='/login'] - The url of the signIn endpoint.
 * @param {ClassConstructor<Response>} [responseModel=UserResponse] - The UserResponse model to use.
 * @param {ApisauceInstance} api - The unauthorizedAPI API instance to use.
 * @returns {UserResponse} - the response from the server.
 */
const signInRequest = createAsyncThunkWithCancelToken<UserResponse>(
  ToolkitActionConst.signIn,
  'POST',
  APIConst.signIn,
  UserResponse,
  unauthorizedAPI
);

/**
 * Creating a auth slice of the redux store
 * @param {AuthStateType} state - The current state of the auth reducer.
 * @param {Action} action - The action to handle.
 * @returns {AuthStateType} The new state of the auth reducer.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthStateType>) => {
    builder
      .addCase(AppRequestActions.cleanAction, (state: Draft<AuthStateType>) => {
        state.loading = INITIAL_STATE.loading;
        state.error = INITIAL_STATE.error;
        state.user = INITIAL_STATE.user;
      })
      .addCase(
        AppRequestActions.cleanErrorAction,
        (state: Draft<AuthStateType>, action: PayloadAction<boolean>) => {
          if (state.error && state.error.isGlobalType === action.payload) {
            state.error = undefined;
          }
        }
      )
      .addCase(signInRequest.pending, (state: Draft<AuthStateType>) => {
        state.loading = true;
      })
      .addCase(
        signInRequest.fulfilled,
        (state: Draft<AuthStateType>, action: PayloadAction<UserResponse>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(
        signInRequest.rejected,
        (state: Draft<AuthStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

/* Exporting the reducer function that will be used in the root reducer. */
export const AuthReducer = authSlice.reducer;

/**
 * Creates an object with all of the actions for the auth slice.
 * @returns {Object} - An object with all of the actions for the auth slice.
 */
export const AuthActions = { ...authSlice.actions, signInRequest };
