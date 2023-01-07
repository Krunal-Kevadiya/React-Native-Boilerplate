import {
  createSlice,
  type ActionReducerMapBuilder,
  type Draft,
  type PayloadAction
} from '@reduxjs/toolkit';
import { UserResponse, ErrorResponse, SignInRequest } from '@models';
import { AppRequestActions } from '../app-request';
import INITIAL_STATE, { type AuthStateType } from './AuthInitial';

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
    signInRequest: (
      state: Draft<AuthStateType>,
      _action: PayloadAction<SignInRequest | undefined>
    ) => {
      state.loading = true;
    },
    signInRequestCancel: () => {},
    signInSuccess: (
      state: Draft<AuthStateType>,
      action: PayloadAction<UserResponse | undefined>
    ) => {
      state.loading = false;
      state.user = action.payload;
    },
    signInFailure: (
      state: Draft<AuthStateType>,
      action: PayloadAction<ErrorResponse | undefined>
    ) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
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
      );
  }
});

/* Exporting the reducer function that will be used in the root reducer. */
export const AuthReducer = authSlice.reducer;
/**
 * Creates an object with all of the actions for the auth slice.
 * @returns {Object} - An object with all of the actions for the auth slice.
 */
export const AuthActions = authSlice.actions;
