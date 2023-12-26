import { useEffect } from 'react';
import { useCreateHandlerSetter, type DependencyList } from '@hooks-utils';
import { navigationRef } from '@utils';

/**
 * Returns a callback setter for a callback to be performed when the component will unmount.
 */
export default function useWillUnmount(
  handler: () => void,
  deps: DependencyList = []
): (nextCallback: () => void) => void {
  const [onUnmountHandler, setOnUnmount] = useCreateHandlerSetter(handler);

  useEffect(
    () => () => {
      onUnmountHandler.current?.();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps]
  );

  return setOnUnmount;
}

/**
 * Returns a callback setter for a callback to be performed when the component will unmount.
 */
export function useScreenWillUnmount(
  currentScreen: string,
  handler: (deps: DependencyList) => void,
  deps: DependencyList = []
): (nextCallback: () => void) => void {
  const [onUnmountHandler, setOnUnmount] = useCreateHandlerSetter(handler);

  useEffect(() => {
    let isSubscribed: boolean = true;
    const unsubscribe = navigationRef.addListener('state', () => {
      const currentRouteName = navigationRef.getCurrentRoute()?.name;
      if (currentRouteName !== currentScreen && isSubscribed) {
        onUnmountHandler.current?.(deps);
      }
    });

    return () => {
      unsubscribe();
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onUnmountHandler, ...deps]);

  return setOnUnmount;
}
