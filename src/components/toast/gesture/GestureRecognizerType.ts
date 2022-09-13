import type { PanResponderGestureState, PanResponderInstance, StyleProp, ViewStyle } from 'react-native';

export enum SwipeDirectionsEnum {
  SWIPE_UP,
  SWIPE_DOWN,
  SWIPE_LEFT,
  SWIPE_RIGHT
}

export type ConfigPropsType = Required<{
  velocityThreshold: number;
  directionalOffsetThreshold: number;
  gestureIsClickThreshold: number;
}>;

export type GestureRecognizerPropsType = Partial<{
  config: ConfigPropsType;
  style: StyleProp<ViewStyle>;
  onSwipe: (swipeDirection: SwipeDirectionsEnum | null | undefined, gestureState: PanResponderGestureState) => void;
  onSwipeUp: (gestureState: PanResponderGestureState) => void;
  onSwipeDown: (gestureState: PanResponderGestureState) => void;
  onSwipeLeft: (gestureState: PanResponderGestureState) => void;
  onSwipeRight: (gestureState: PanResponderGestureState) => void;
}>;

export type SwipeHandlerPropsType = {
  swipeDirection?: SwipeDirectionsEnum | null;
  gestureState: PanResponderGestureState;
  onSwipe?: (swipeDirection: SwipeDirectionsEnum | null | undefined, gestureState: PanResponderGestureState) => void;
  onSwipeUp?: (gestureState: PanResponderGestureState) => void;
  onSwipeDown?: (gestureState: PanResponderGestureState) => void;
  onSwipeLeft?: (gestureState: PanResponderGestureState) => void;
  onSwipeRight?: (gestureState: PanResponderGestureState) => void;
};

export type UseGestureRecognizerReturnType = Required<{
  panResponder: PanResponderInstance;
}>;
