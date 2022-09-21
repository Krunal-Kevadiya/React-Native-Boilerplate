import React, { forwardRef } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import Animated, { withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useTheme } from 'rn-custom-style-sheet';

import { isPresentValue } from '@utils';

import { Icon } from '../icon';

import { GestureRecognizer } from './gesture';
import styleSheet from './ToastStyle';
import { defaultProps } from './ToastTypes';
import useToast from './useToast';

import type { ToastHandleType, ToastPropsType, UseToastReturnType } from './ToastTypes';

/**
 * A custom toast component that can be used to display messages to the user.
 * @param {ToastPropsType} props - The props for the toast component.
 * @param {React.Ref<ToastHandleType>} ref - The ref for the toast component.
 * @returns {React.ReactElement} A React Element.
 */
function CustomToast(
  { translucent = defaultProps.translucent, numberOfLines = defaultProps.numberOfLines, toastPosition }: ToastPropsType,
  ref: React.Ref<ToastHandleType>
): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const { data, offset, minHeight, handlerSwipeUp, handleLayout }: UseToastReturnType = useToast(
    translucent,
    toastPosition,
    ref
  );
  const customSpringStyles = useAnimatedStyle<ViewStyle>(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      ...(toastPosition ? { [toastPosition]: 0 } : {}),
      transform: [
        {
          translateY: withSpring(offset.value, {
            damping: 20,
            stiffness: 90
          })
        }
      ]
    };
  });
  const tintStyle = isPresentValue(data?.imageTint) ? { tintColor: data?.imageTint } : null;
  const isSrc = data?.image !== undefined && data?.image !== null;
  const containerStyle: ViewStyle = {
    height: minHeight,
    justifyContent: 'flex-end'
  };
  const isShowView = isPresentValue(data?.message) || isSrc;

  return (
    <Animated.View style={customSpringStyles}>
      {isShowView && (
        <View style={containerStyle}>
          <View style={styles.contentContainerStyle} onLayout={handleLayout}>
            {isPresentValue(data?.message) && (
              <Text numberOfLines={numberOfLines} style={styles.messageStyle}>
                {data?.message}
              </Text>
            )}
            {isSrc && (
              //@ts-ignore
              <Icon
                type="svg"
                style={StyleSheet.flatten([styles.imageStyle, tintStyle ?? styles.tintColor])}
                source={data?.image}
              />
            )}
          </View>
          <GestureRecognizer
            style={StyleSheet.flatten([styles.absoluteView, containerStyle])}
            onSwipeUp={handlerSwipeUp}
          />
        </View>
      )}
    </Animated.View>
  );
}

const Toast = forwardRef(CustomToast) as (
  props: ToastPropsType & { ref: React.Ref<ToastHandleType> }
) => ReturnType<typeof CustomToast>;

export default Toast;
