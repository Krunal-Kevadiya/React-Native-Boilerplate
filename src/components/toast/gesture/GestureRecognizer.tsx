import React from 'react';
import { View } from 'react-native';
import type { GestureRecognizerPropsType, UseGestureRecognizerReturnType } from './GestureRecognizerType';
import useGestureRecognizer from './GestureRecognizerHook';

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
