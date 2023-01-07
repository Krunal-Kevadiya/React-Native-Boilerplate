import Animated from 'react-native-reanimated';
import type { PanResponderGestureState, LayoutChangeEvent } from 'react-native';

/**
 * The internal data properties for the extension.
 * @typedef {Object} InternalDataPropsType
 * @property {string} [message] - The message to display in the popup.
 * @property {number} [image] - The image to display in the popup.
 * @property {string} [imageTint] - The tint to apply to the image.
 * @property {number} [interval] - The interval to use for the popup.
 */
export type InternalDataPropsType = {
  type?: ToastType;
  title?: string;
  message?: string;
  image?: number;
  imageTint?: string;
  interval?: number;
};

export enum ToastType {
  danger,
  error,
  warning,
  detail,
  info,
  success,
  primary,
  custom
}

/**
 * The position of the toast.
 */
export type ToastPosition = 'top' | 'bottom';
/**
 * The props for the Toast component.
 * @typedef {Object} ToastPropsType
 * @property {boolean} [translucent=false] - Whether the toast should be translucent.
 * @property {number} [numberOfLines=1] - The number of lines to show in the toast.
 * @property {ToastPosition} toastPosition - The position of the toast.
 */
export type ToastPropsType = {
  translucent?: boolean;
  numberOfLines?: number;
  toastPosition: ToastPosition;
};

export const defaultProps = {
  translucent: true,
  numberOfLines: 2
};

/**
 * A type that represents the ToastHandle object.
 * @typedef {object} ToastHandleType
 * @property {function} clearToast - A function that clears the toast.
 * @property {function} toastWithType - A function that displays a toast.
 * @property {function} toastLifecycle - A function that allows you to observe the lifecycle of the toast.
 */
export type ToastHandleType = Required<{
  clearToast: () => void;
  toastWithType: (newData: InternalDataPropsType) => void;
  toastLifecycle: (callback: (isOpen: boolean) => void) => void;
}>;

/**
 * A hook that returns the data and offset values needed to create a toast.
 * @returns {UseToastReturnType}
 */
export type UseToastReturnType = {
  data: InternalDataPropsType | null;
  offset: Animated.SharedValue<number>;
  opacity: Animated.SharedValue<number>;
  minHeight: number;
  handlerSwipeUp: (gestureState: PanResponderGestureState) => void | undefined | null;
  handleLayout: (event: LayoutChangeEvent) => void;
  handleHideToast: () => void;
};
