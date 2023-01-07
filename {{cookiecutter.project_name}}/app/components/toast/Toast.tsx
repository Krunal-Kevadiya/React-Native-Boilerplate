import isEmpty from 'lodash/isEmpty';
import React, { forwardRef, useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, type ViewStyle } from 'react-native';
import Animated, { withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useTheme } from 'rn-custom-style-sheet';
import { Icons } from '@assets';
import { Icon } from '../icon';
import { GestureRecognizer } from './gesture';
import { boxBackgroundColor, boxIconColor } from './ToastConstant';
import styleSheet from './ToastStyle';
import {
  defaultProps,
  ToastType,
  type ToastHandleType,
  type ToastPropsType,
  type UseToastReturnType
} from './ToastTypes';
import useToast from './useToast';

/**
 * A custom toast component that can be used to display messages to the user.
 * @param {ToastPropsType} props - The props for the toast component.
 * @param {React.Ref<ToastHandleType>} ref - The ref for the toast component.
 * @returns {React.ReactElement} A React Element.
 */
function CustomToast(
  {
    translucent = defaultProps.translucent,
    numberOfLines = defaultProps.numberOfLines,
    toastPosition
  }: ToastPropsType,
  ref: React.Ref<ToastHandleType>
): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const {
    data,
    offset,
    opacity,
    minHeight,
    handlerSwipeUp,
    handleLayout,
    handleHideToast
  }: UseToastReturnType = useToast(translucent, toastPosition, ref);
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
      ],
      opacity: opacity.value
    };
  });
  const tintStyle = !isEmpty(data?.imageTint) ? { tintColor: data?.imageTint } : null;
  const isSrc = data?.image !== undefined && data?.image !== null;
  const containerStyle: ViewStyle = useMemo(
    () => ({
      height: minHeight,
      justifyContent: 'flex-end'
    }),
    [minHeight]
  );
  const isShowView = !isEmpty(data?.message) || isSrc;
  const isNoInternet = data?.interval === 0;

  return (
    <Animated.View style={customSpringStyles}>
      {isShowView && (
        <View style={containerStyle}>
          <View
            style={StyleSheet.flatten([
              styles.contentContainerStyle,
              {
                backgroundColor: boxBackgroundColor[data?.type ?? ToastType.detail]
              }
            ])}
            onLayout={handleLayout}
          >
            <View style={styles.bubblesImage}>
              <Icon
                type="svg"
                source={Icons.icToastBubbles}
                style={StyleSheet.flatten([
                  styles.bubblesImage,
                  { tintColor: boxIconColor[data?.type ?? ToastType.detail] }
                ])}
                size={52}
              />
            </View>
            {!isNoInternet && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.chatBubblesTouchView}
                onPress={handleHideToast}
              >
                <View style={styles.chatBubblesView}>
                  <Icon
                    type="svg"
                    source={Icons.icChatBubbles}
                    style={StyleSheet.flatten([
                      styles.chatBubblesImage,
                      { tintColor: boxIconColor[data?.type ?? ToastType.detail] }
                    ])}
                    size={42}
                  />
                  <Icon
                    type="svg"
                    source={Icons.icCancel}
                    style={styles.chatBubblesCloseImage}
                    size={16}
                  />
                </View>
              </TouchableOpacity>
            )}
            {isSrc && (
              <Image
                style={StyleSheet.flatten([styles.imageStyle, tintStyle ?? styles.tintColor])}
                source={data?.image}
              />
            )}
            <View style={styles.contentStyle}>
              {!isEmpty(data?.title) && (
                <Text numberOfLines={1} style={styles.titleStyle}>
                  {data?.title}
                </Text>
              )}
              {!isEmpty(data?.message) && (
                <Text numberOfLines={numberOfLines} style={styles.messageStyle}>
                  {data?.message}
                </Text>
              )}
            </View>
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
