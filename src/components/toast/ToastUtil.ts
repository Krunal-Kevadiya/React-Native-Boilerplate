import React from 'react';
import { runOnJS } from 'react-native-reanimated';
import type { InternalDataPropsType } from './ToastType';

export function callback(
  isFinished: boolean | undefined,
  setData: React.Dispatch<React.SetStateAction<InternalDataPropsType | null>>
): void {
  'worklet';

  if (isFinished) {
    runOnJS(setData)(null);
  }
}
