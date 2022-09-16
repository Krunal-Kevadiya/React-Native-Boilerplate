import { useState } from 'react';

import { getStorageString, setStorageString } from '@utils';

import useDidMount from './useDidMount';

import type { StorageStringType } from '@utils';

type AsyncStorageStateType<T> = {
  hydrated: boolean;
  storageValue: T;
};

export default function useAsyncStorage<T extends StorageStringType>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void, boolean] {
  const [state, setState] = useState<AsyncStorageStateType<T>>({
    hydrated: false,
    storageValue: defaultValue
  });
  const { hydrated, storageValue }: AsyncStorageStateType<T> = state;

  function pullFromStorage(): void {
    const fromStorage = getStorageString<T>(key, defaultValue);
    setState({ hydrated: true, storageValue: fromStorage });
  }

  function updateStorage(newValue: T): void {
    setState({ hydrated: true, storageValue: newValue });
    setStorageString<T>(key, newValue);
  }

  useDidMount(() => {
    pullFromStorage();
  }, []);

  return [storageValue, updateStorage, hydrated];
}
