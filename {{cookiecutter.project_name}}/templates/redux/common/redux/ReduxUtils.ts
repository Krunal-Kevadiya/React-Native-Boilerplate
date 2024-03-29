import type { RootStateType } from './Store';

/**
 * Returns the state of the Redux store.
 * @returns {RootStateType} The state of the Redux store.
 */
export function getStorage(): RootStateType {
  return require('../redux/Store').default.store.getState();
}
