import { UserResponse, ErrorResponse } from '@models';

/**
 * The state of the authentication process.
 * @typedef {Object} AuthStateType
 * @property {UserResponse | undefined} user - The user object if the user is authenticated.
 */
export type AuthStateType = {
  loading: boolean;
  error?: ErrorResponse;
  user?: UserResponse;
};

/**
 * Defining the initial state of the auth reducer.
 * @returns {AuthStateType} The initial state of the auth reducer.
 */
const INITIAL_STATE: AuthStateType = {
  loading: false,
  error: undefined,
  user: undefined
};

export default INITIAL_STATE;
