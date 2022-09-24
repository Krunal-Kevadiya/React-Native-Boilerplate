import { BackHandler } from 'react-native';

import useLifecycle from './useLifecycle';

/**
 * Back handler hook that adds a back button listener to the application.
 * @param {() => boolean} handler - the function to call when the back button is pressed.
 * @returns None
 */
export default function useBackHandler(handler: () => boolean): void {
  useLifecycle(
    () => {
      BackHandler.addEventListener('hardwareBackPress', handler);
    },
    () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    }
  );
}
