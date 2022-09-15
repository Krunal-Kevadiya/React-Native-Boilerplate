import { SwipeDirectionsEnum } from './GestureRecognizerTypes';

import type { ConfigPropsType, SwipeHandlerPropsType } from './GestureRecognizerTypes';
import type { GestureResponderEvent, PanResponderGestureState } from 'react-native';

export const swipeConfig: ConfigPropsType = Object.freeze({
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
  gestureIsClickThreshold: 5
});

let classSwipeConfig: ConfigPropsType = swipeConfig;

export function setClassSwipeConfig(config: ConfigPropsType): void {
  classSwipeConfig = config;
}

function isValidSwipe(
  velocity: number,
  velocityThreshold: number,
  directionalOffset: number,
  directionalOffsetThreshold: number
): boolean {
  return Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
}

function gestureIsClick(gestureState: PanResponderGestureState): boolean {
  return (
    Math.abs(gestureState.dx) < classSwipeConfig.gestureIsClickThreshold &&
    Math.abs(gestureState.dy) < classSwipeConfig.gestureIsClickThreshold
  );
}

export function handleShouldSetPanResponder(
  evt: GestureResponderEvent,
  gestureState: PanResponderGestureState
): boolean {
  return evt.nativeEvent.touches.length === 1 && !gestureIsClick(gestureState);
}

function triggerSwipeHandlers({
  swipeDirection,
  gestureState,
  onSwipe,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight
}: SwipeHandlerPropsType): void {
  const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = SwipeDirectionsEnum;
  onSwipe?.(swipeDirection, gestureState);
  switch (swipeDirection) {
    case SWIPE_LEFT:
      onSwipeLeft?.(gestureState);
      break;
    case SWIPE_RIGHT:
      onSwipeRight?.(gestureState);
      break;
    case SWIPE_UP:
      onSwipeUp?.(gestureState);
      break;
    case SWIPE_DOWN:
      onSwipeDown?.(gestureState);
      break;
    default:
  }
}

function isValidHorizontalSwipe(gestureState: PanResponderGestureState): boolean {
  const { vx, dy } = gestureState;
  const { velocityThreshold, directionalOffsetThreshold } = classSwipeConfig;
  return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
}

function isValidVerticalSwipe(gestureState: PanResponderGestureState): boolean {
  const { vy, dx } = gestureState;
  const { velocityThreshold, directionalOffsetThreshold } = classSwipeConfig;
  return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
}

function getSwipeDirection(gestureState: PanResponderGestureState): SwipeDirectionsEnum | null {
  const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = SwipeDirectionsEnum;
  const { dx, dy } = gestureState;
  if (isValidVerticalSwipe(gestureState)) {
    return dy > 0 ? SWIPE_DOWN : SWIPE_UP;
  }
  if (isValidHorizontalSwipe(gestureState)) {
    return dx > 0 ? SWIPE_RIGHT : SWIPE_LEFT;
  }
  return null;
}

export function handlePanResponderEnd({
  gestureState,
  onSwipe,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight
}: SwipeHandlerPropsType): void {
  const swipeDirection: SwipeDirectionsEnum | null = getSwipeDirection(gestureState);
  triggerSwipeHandlers({
    swipeDirection,
    gestureState,
    onSwipe,
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight
  });
}
