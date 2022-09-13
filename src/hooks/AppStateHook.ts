import { useEffect, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import { isAndroid } from '@themes';

type UseAppStatePropsType = {
  onChange?: (status: AppStateStatus) => void;
  onForeground?: () => void;
  onBackground?: () => void;
};

export default function useAppState(settings?: UseAppStatePropsType): AppStateStatus {
  const { onChange, onForeground, onBackground }: UseAppStatePropsType = settings ?? {};
  const [firstTime, setFirstTime] = useState<boolean>(isAndroid);
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus): void => {
      if (nextAppState === 'active' && appState !== 'active') {
        onForeground?.();
      } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        onBackground?.();
      }
      setAppState(nextAppState);
      onChange?.(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);
    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, [onChange, onForeground, onBackground, appState]);

  useEffect(() => {
    if (firstTime) {
      setFirstTime(false);
      onForeground?.();
    }
  }, [firstTime, onForeground]);

  return appState;
}
