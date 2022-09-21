import { useEffect } from 'react';

import { useCreateHandlerSetter } from '@hooks-util';

import type { DependencyList } from '@hooks-util';
/**
 * Returns a callback setter for a function to be performed when the component did mount.
 */
export default function useDidMount(
  handler: () => void,
  deps: DependencyList = []
): (nextCallback: () => void) => void {
  const [onMountHandler, setOnMountHandler] = useCreateHandlerSetter(handler);

  useEffect(() => {
    onMountHandler.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  return setOnMountHandler;
}
