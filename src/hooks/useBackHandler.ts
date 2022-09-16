import { BackHandler } from 'react-native';

import useLifecycle from './useLifecycle';

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
