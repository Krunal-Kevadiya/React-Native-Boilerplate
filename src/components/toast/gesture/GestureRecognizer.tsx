import React from 'react';
import { View } from 'react-native';

import useGestureRecognizer from './useGestureRecognizer';

import type { GestureRecognizerPropsType, UseGestureRecognizerReturnType } from './GestureRecognizerTypes';

export default function GestureRecognizer({
  config,
  onSwipe,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  ...viewProps
}: GestureRecognizerPropsType): React.ReactElement {
  const { panResponder }: UseGestureRecognizerReturnType = useGestureRecognizer({
    config,
    onSwipe,
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight
  });

  return <View {...viewProps} {...panResponder.panHandlers} />;
}
