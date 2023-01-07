import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Animated, { interpolateColors, spring } from 'react-native-reanimated';
import { useTheme } from 'rn-custom-style-sheet';
import styleSheet, { SwitchWidth } from './SwitchStyles';
import { defaultProps, type SwitchPropsType } from './SwitchTypes';

/**
 * A Switch component that can be used to toggle between two values.
 * @param {SwitchPropsType} props - The props for the Switch component.
 * @returns {React.ReactElement} A React Element.
 */
export default function Switch({
  handleOnPress,
  activeTrackColor,
  inActiveTrackColor,
  activeThumbColor,
  inActiveThumbColor,
  value,
  disabled
}: SwitchPropsType): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const [switchTranslate] = useState<Animated.Value<number>>(new Animated.Value(0));

  useEffect(() => {
    if (value) {
      spring(switchTranslate, {
        toValue: SwitchWidth / 2,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001
      }).start();
    } else {
      spring(switchTranslate, {
        toValue: 2,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001
      }).start();
    }
  }, [value, switchTranslate]);

  const animatedTrackStyles = useMemo<ViewStyle>(
    () => ({
      borderWidth: 1,
      //@ts-ignore
      borderColor: interpolateColors(switchTranslate, {
        inputRange: [0, SwitchWidth / 2],
        outputColorRange: [inActiveTrackColor, activeTrackColor]
      }),
      //@ts-ignore
      backgroundColor: interpolateColors<string>(switchTranslate, {
        inputRange: [0, SwitchWidth / 2],
        outputColorRange: [inActiveTrackColor, activeTrackColor]
      })
    }),
    [activeTrackColor, inActiveTrackColor, switchTranslate]
  );

  const animatedThumbStyles = useMemo<ViewStyle>(
    () => ({
      //@ts-ignore
      transform: [{ translateX: switchTranslate }],
      //@ts-ignore
      backgroundColor: interpolateColors(switchTranslate, {
        inputRange: [0, SwitchWidth / 2],
        outputColorRange: [inActiveThumbColor, activeThumbColor]
      })
    }),
    [activeThumbColor, inActiveThumbColor, switchTranslate]
  );

  const memoizedOnSwitchPressCallback = useCallback<() => void>(() => {
    handleOnPress(!value);
  }, [handleOnPress, value]);

  return (
    <Pressable disabled={disabled} onPress={memoizedOnSwitchPressCallback}>
      <Animated.View style={StyleSheet.flatten([styles.containerStyle, animatedTrackStyles])}>
        <Animated.View
          style={StyleSheet.flatten([styles.circleStyle, animatedThumbStyles, styles.shadowValue])}
        />
      </Animated.View>
    </Pressable>
  );
}

Switch.defaultProps = defaultProps;
