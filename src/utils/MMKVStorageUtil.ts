import { MMKV } from 'react-native-mmkv';
import type { Storage } from 'redux-persist';
import { isPresentValue } from './StringUtil';

const storage = new MMKV();

export function getStorageString<T extends StorageStringType>(key: string, defaultValue: T): T {
  const value = storage.getString(key) ?? '';
  if (!isPresentValue(value)) {
    return defaultValue;
  } else if (typeof defaultValue === 'boolean') {
    return Boolean(value) as T;
  } else if (typeof defaultValue === 'string') {
    return String(value) as T;
  } else if (typeof defaultValue === 'number') {
    return Number(value) as T;
  }
  return JSON.parse(value);
}

export type StorageStringType = boolean | string | number | object;

export function setStorageString<T extends StorageStringType>(key: string, newValue: T): void {
  let value: boolean | string | number;
  if (typeof newValue === 'boolean' || typeof newValue === 'string' || typeof newValue === 'number') {
    value = newValue;
  } else {
    value = JSON.stringify(newValue);
  }
  storage.set(key, value);
}

export const ReduxStorage: Storage = {
  setItem: (key: string, value: string | number | boolean): Promise<boolean> => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string): Promise<string | undefined> => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string): Promise<void> => {
    storage.delete(key);
    return Promise.resolve();
  }
};
