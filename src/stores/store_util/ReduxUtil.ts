import type { RootStateType } from '@stores-redux';

export function getStorage(): RootStateType {
  return require('../redux/Store').default.store.getState();
}
