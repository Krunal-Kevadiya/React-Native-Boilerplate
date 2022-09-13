import { ErrorResponse } from '@models';

export type AppRequestStateType = {
  loading: boolean;
  error?: ErrorResponse;
};

const INITIAL_STATE: AppRequestStateType = {
  loading: false,
  error: undefined
};

export default INITIAL_STATE;
