/**
 * The state of the app request process.
 * @typedef {Object} AppRequestStateType
 * @property {boolean} isLoading - Whether the request process is in progress.
 * @property {ErrorResponse | undefined} error - The error object if there was an error.
 */
export type AppRequestStateType = {};

/**
 * Defining the initial state of the app request reducer.
 * @returns {AppRequestStateType} The initial state of the app request reducer.
 */
const INITIAL_STATE: AppRequestStateType = {};

export default INITIAL_STATE;
