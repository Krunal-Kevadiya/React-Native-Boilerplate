import type { RootStateType } from '../Store';
import type { AppRequestStateType } from './AppRequestInitial';

/**
 * A type that contains the selectors for the AppRequest reducer.
 * @typedef {Object} AppRequestSelectorsType
 * @property {(state: RootStateType) => AppRequestStateType} getAppRequest - The selector for the AppRequest reducer.
 */
type AppRequestSelectorsType = {
  getAppRequest: (state: RootStateType) => AppRequestStateType;
};

/**
 * A type that contains the selectors for the AppRequest reducer.
 * @type {AppRequestSelectorsType}
 */
const AppRequestSelectors: AppRequestSelectorsType = {
  getAppRequest: (state: RootStateType): AppRequestStateType => state.appRequest
};

export default AppRequestSelectors;
