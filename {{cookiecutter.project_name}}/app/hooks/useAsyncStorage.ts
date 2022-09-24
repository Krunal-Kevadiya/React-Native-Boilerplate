import { useState } from 'react';

import { getStorageString, setStorageString } from '@utils';

import useDidMount from './useDidMount';

import type { StorageStringType } from '@utils';

/**
 * A type that represents the state of an AsyncStorage object.
 * @typedef {Object} AsyncStorageStateType<T>
 * @property {boolean} hydrated - Whether or not the storage value has been hydrated.
 * @property {T} storageValue - The value of the storage object.
 */
type AsyncStorageStateType<T> = {
  hydrated: boolean;
  storageValue: T;
};

/**
 * A async storage hook that returns the value of a key in local storage.
 * @param {string} key - the key to get the value of
 * @param {T} defaultValue - the default value to return if the key is not found
 * @returns {[T, (newValue: T) => void, boolean]} - the value of the key, a function to update the value, and a boolean indicating whether the value has been hydrated from storage yet.
 */
export default function useAsyncStorage<T extends StorageStringType>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void, boolean] {
  const [state, setState] = useState<AsyncStorageStateType<T>>({
    hydrated: false,
    storageValue: defaultValue
  });
  const { hydrated, storageValue }: AsyncStorageStateType<T> = state;

  /**
   * Pulls the value from the storage and sets the state accordingly.
   * @returns None
   */
  function pullFromStorage(): void {
    const fromStorage = getStorageString<T>(key, defaultValue);
    setState({ hydrated: true, storageValue: fromStorage });
  }

  /**
   * Updates the state and the local storage with the new value.
   * @param {T} newValue - the new value to update the state and local storage with.
   * @returns None
   */
  function updateStorage(newValue: T): void {
    setState({ hydrated: true, storageValue: newValue });
    setStorageString<T>(key, newValue);
  }

  useDidMount(() => {
    pullFromStorage();
  }, []);

  return [storageValue, updateStorage, hydrated];
}
