import { createSlice, type PayloadAction, type Draft } from '@reduxjs/toolkit';
import { ErrorResponse } from '@models';
import type { AppRequestStateType } from './AppRequestInitial';
import { cleanAction } from '../auth';
import INITIAL_STATE from './AppRequestInitial';

function cleanSuccess(state: Draft<AppRequestStateType>): void {
  state.loading = INITIAL_STATE.loading;
  state.error = INITIAL_STATE.error;
}

function changeLoading(state: Draft<AppRequestStateType>, action: PayloadAction<boolean>): void {
  state.loading = action.payload;
}

function changeError(state: Draft<AppRequestStateType>, action: PayloadAction<ErrorResponse | undefined>): void {
  state.error = action.payload ?? undefined;
  state.loading = false;
}

function connectSocket(): void {}
function disconnectSocket(): void {}

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

export const AppRequestReducer = appRequestSlice.reducer;
export const AppRequestActions = appRequestSlice.actions;
