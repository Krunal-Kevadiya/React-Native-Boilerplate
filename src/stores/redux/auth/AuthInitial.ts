import { UserResponse } from '@models';

export type AuthStateType = {
  user?: UserResponse;
};

const INITIAL_STATE: AuthStateType = {
  user: undefined
};

export default INITIAL_STATE;
