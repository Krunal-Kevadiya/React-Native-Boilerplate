/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle, PanResponderGestureState } from 'react-native';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import { useHeaderHeight, useKeyboard, useStatusBarHeight, useTimeout } from '@hooks';
import { isNullOrUndefined } from '@utils';
import type { ToastHandleType, InternalDataPropsType, UseToastReturnType, ToastPosition } from './Toast.type';
import { callback } from './Toast.util';

function getMinHeight(
  toastPosition: ToastPosition,
  headerHeight: number,
  statusBarHeight: number,
  keyboardHeight: number,
  layout: LayoutRectangle,
  shown: boolean,
  translucent: boolean
): number {
  let minHeight = 0;
  if (toastPosition === 'top') {
    minHeight = headerHeight + (translucent ? statusBarHeight : 0);
  } else {
    const viewHeight = layout.height + statusBarHeight;
    minHeight = shown ? keyboardHeight + statusBarHeight : viewHeight;
  }
  return minHeight;
}

export default function useToast(
  translucent: boolean,
  toastPosition: ToastPosition,
  ref: React.Ref<ToastHandleType>
): UseToastReturnType {
  const statusBarHeight: number = useStatusBarHeight();
  const headerHeight: number = useHeaderHeight();
  const [data, setData] = useState<InternalDataPropsType | null>(null);
  const toastLifecycleRef = useRef<(isOpen: boolean) => void>();
  const [shown, , keyboardHeight] = useKeyboard();
  const [layout, setLayout] = useState<LayoutRectangle>({ x: 0, y: 0, height: 0, width: 0 });
  const [minHeight, setMinHeight] = useState<number>(
    getMinHeight(toastPosition, headerHeight, statusBarHeight, keyboardHeight, layout, shown, translucent)
  );
  const offset = useSharedValue<number>(toastPosition === 'top' ? -minHeight : minHeight);

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
    },
    [minHeight, offset, toastPosition]
  );

  const toastShow = useCallback<(duration: number, height?: number) => void>(
    (duration: number, height?: number) => {
      offset.value = withTiming(toastPosition === 'top' ? 0 : -(height ?? minHeight), {
        duration: duration,
        easing: Easing.out(Easing.exp)
      });
    },
    [minHeight, offset, toastPosition]
  );

  const handlerSwipeUp = useCallback<(gestureState: PanResponderGestureState) => void | undefined | null>(() => {
    if (data?.interval !== 0) {
      toastHide(0);
    }
  }, [data?.interval, minHeight, offset, toastPosition]);

  const handleHideToast = useCallback<() => void>(() => {
    toastHide(700);
  }, [minHeight, offset, toastPosition]);

  const handleLayout = useCallback<(event: LayoutChangeEvent) => void>((event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  }, []);

  useEffect(() => {
    const localMinHeight = getMinHeight(
      toastPosition,
      headerHeight,
      statusBarHeight,
      keyboardHeight,
      layout,
      shown,
      translucent
    );
    if (isNullOrUndefined(data)) {
      setMinHeight(localMinHeight);
      offset.value = toastPosition === 'top' ? -localMinHeight : localMinHeight;
    } else {
      toastShow(50, localMinHeight);
    }
  }, [toastPosition, shown, layout, keyboardHeight, translucent, data]);

  useTimeout(() => toastLifecycleRef.current?.(false), isNullOrUndefined(data) ? 1000 : undefined);

  useTimeout(handleHideToast, data?.interval !== 0 ? data?.interval : undefined);

  useImperativeHandle(ref, () => ({
    toastWithType: (message?: string, image?: number, imageTint?: string, interval?: number): void => {
      const newData: InternalDataPropsType = {
        message: message,
        image,
        imageTint,
        interval
      };
      if (newData?.interval !== 0) {
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

  return { data, offset, minHeight, handlerSwipeUp, handleLayout };
}
