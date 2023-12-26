/* eslint-disable react-hooks/exhaustive-deps */
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import { type UseScaleUtilsReturnType, useScaleUtils } from 'rn-custom-style-sheet';
import { useHeaderHeight, useKeyboard, useStatusBarHeight, useTimeout } from '@hooks';
import { isAndroid, isTablet } from '@themes';
import { callback } from './ToastUtil';
import type {
  ToastHandleType,
  InternalDataPropsType,
  UseToastReturnType,
  ToastPosition
} from './ToastTypes';
import type { LayoutChangeEvent, LayoutRectangle, PanResponderGestureState } from 'react-native';

/**
 * Gets the minimum height of the toast based on the position of the toast.
 * @param {ToastPosition} toastPosition - the position of the toast
 * @param {number} headerHeight - the height of the header
 * @param {number} statusBarHeight - the height of the status bar
 * @param {number} keyboardHeight - the height of the keyboard
 * @param {LayoutRectangle} layout - the layout of the view
 * @param {boolean} shown - whether the toast is shown
 * @param {boolean} translucent - whether the status bar is translucent
 * @returns {number} the minimum height of the
 */
function getMinHeight(
  toastPosition: ToastPosition,
  headerHeight: number,
  statusBarHeight: number,
  keyboardHeight: number,
  layout: LayoutRectangle,
  shown: boolean,
  translucent: boolean,
  verticalScale: (size: number, skipAspectRatio?: boolean) => number
): number {
  let minHeight = 0;
  if (toastPosition === 'top') {
    minHeight = headerHeight + (translucent ? statusBarHeight : 0);
  } else {
    const viewHeight = layout.height + statusBarHeight;
    minHeight = shown ? keyboardHeight + statusBarHeight : viewHeight;
  }
  minHeight += isAndroid ? verticalScale(50) : 0;
  return minHeight + (isTablet ? verticalScale(32) : 0);
}

/**
 * A custom toast hook that returns the data and offset values for the toast.
 * @param {boolean} translucent - Whether the toast is translucent or not.
 * @param {ToastPosition} toastPosition - The position of the toast.
 * @param {React.Ref<ToastHandleType>} ref - The ref to the toast.
 * @returns {UseToastReturnType} - The data and offset values for the toast.
 */
export default function useToast(
  translucent: boolean,
  toastPosition: ToastPosition,
  ref: React.Ref<ToastHandleType>
): UseToastReturnType {
  const { verticalScale }: UseScaleUtilsReturnType = useScaleUtils();
  const statusBarHeight: number = useStatusBarHeight();
  const headerHeight: number = useHeaderHeight();
  const [data, setData] = useState<InternalDataPropsType | null>(null);
  const toastLifecycleRef = useRef<(isOpen: boolean) => void>();
  const [shown, , keyboardHeight] = useKeyboard();
  const [layout, setLayout] = useState<LayoutRectangle>({ x: 0, y: 0, height: 0, width: 0 });
  const [minHeight, setMinHeight] = useState<number>(
    getMinHeight(
      toastPosition,
      headerHeight,
      statusBarHeight,
      keyboardHeight,
      layout,
      shown,
      translucent,
      verticalScale
    )
  );
  const offset = useSharedValue<number>(toastPosition === 'top' ? -minHeight : minHeight);
  const opacity = useSharedValue<number>(0);

  const toastHide = useCallback<(duration: number) => void>(
    (duration: number) => {
      offset.value = withTiming(
        toastPosition === 'top' ? -minHeight : minHeight,
        {
          duration: duration,
          easing: Easing.out(Easing.exp)
        },
        (isFinished?: boolean) => callback(isFinished, setData)
      );
      opacity.value = withTiming(0, {
        duration: duration,
        easing: Easing.out(Easing.linear)
      });
    },
    [minHeight, offset, opacity, toastPosition]
  );

  const toastShow = useCallback<(duration: number, height?: number) => void>(
    (duration: number, height?: number) => {
      offset.value = withTiming(toastPosition === 'top' ? 0 : -(height ?? minHeight), {
        duration: duration,
        easing: Easing.out(Easing.exp)
      });
      opacity.value = withTiming(1, {
        duration: duration / 2,
        easing: Easing.out(Easing.linear)
      });
    },
    [minHeight, offset, opacity, toastPosition]
  );

  const handlerSwipeUp = useCallback<
    (gestureState: PanResponderGestureState) => void | undefined | null
  >(() => {
    if (data?.interval !== 0) {
      toastHide(0);
    }
  }, [data?.interval, minHeight, offset, opacity, toastPosition]);

  const handleHideToast = useCallback<() => void>(() => {
    toastHide(700);
  }, [minHeight, offset, opacity, toastPosition]);

  const handleLayout = useCallback<(event: LayoutChangeEvent) => void>(
    (event: LayoutChangeEvent) => {
      setLayout(event.nativeEvent.layout);
    },
    []
  );

  useEffect(() => {
    const localMinHeight = getMinHeight(
      toastPosition,
      headerHeight,
      statusBarHeight,
      keyboardHeight,
      layout,
      shown,
      translucent,
      verticalScale
    );
    if (isEmpty(data)) {
      setMinHeight(localMinHeight);
      offset.value = toastPosition === 'top' ? -localMinHeight : localMinHeight;
    } else {
      toastShow(50, localMinHeight);
    }
  }, [toastPosition, shown, layout, keyboardHeight, translucent, data]);

  useTimeout(() => toastLifecycleRef.current?.(false), isEmpty(data) ? 1000 : undefined);

  useTimeout(handleHideToast, data?.interval !== 0 ? data?.interval : undefined);

  useImperativeHandle(ref, () => ({
    toastWithType: (newData: InternalDataPropsType): void => {
      if (data === null || data === undefined || newData?.interval !== 0) {
        setData(newData);
        toastShow(700);
      }
    },
    toastLifecycle: (argCallback: (isOpen: boolean) => void): void => {
      toastLifecycleRef.current = argCallback;
      argCallback(false);
    },
    clearToast: (): void => {
      toastHide(0);
    }
  }));

  return { data, offset, opacity, minHeight, handlerSwipeUp, handleLayout, handleHideToast };
}
