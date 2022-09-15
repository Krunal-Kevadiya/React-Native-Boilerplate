import Animated from 'react-native-reanimated';

import type { PanResponderGestureState, LayoutChangeEvent } from 'react-native';

export type InternalDataPropsType = {
  message?: string;
  image?: number;
  imageTint?: string;
  interval?: number;
};

export type ToastPosition = 'top' | 'bottom';
export type ToastPropsType = {
  translucent?: boolean;
  numberOfLines?: number;
  toastPosition: ToastPosition;
} & typeof defaultProps;

export const defaultProps = {
  translucent: true,
  numberOfLines: 2
};

export type ToastHandleType = Required<{
  clearToast: () => void;
  toastWithType: (message?: string, image?: number, imageTint?: string, interval?: number) => void;
  toastLifecycle: (callback: (isOpen: boolean) => void) => void;
}>;

export type UseToastReturnType = {
  data: InternalDataPropsType | null;
  offset: Animated.SharedValue<number>;
  minHeight: number;
  handlerSwipeUp: (gestureState: PanResponderGestureState) => void | undefined | null;
  handleLayout: (event: LayoutChangeEvent) => void;
};
