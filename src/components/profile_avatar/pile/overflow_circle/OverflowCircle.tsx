import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { moderateScale, useTheme } from 'rn-custom-style-sheet';

import styleSheet from './OverflowCircleStyles';

import type { OverflowCirclePropsType } from './OverflowCircleTypes';

/**
 * A component that displays the number of items that are overflowing.
 * @param {OverflowCirclePropsType} props - the props for the component.
 * @returns {React.ReactElement} A React Element.
 */
export default function OverflowCircle({
  overflow,
  circleStyle,
  overflowStyle,
  overflowLabelStyle,
  circleSize
}: OverflowCirclePropsType) {
  const { styles } = useTheme(styleSheet);
  const localSize: number = moderateScale(circleSize);

  const localCircleStyle: ViewStyle = {
    width: localSize,
    height: localSize
  };

  return (
    <View style={StyleSheet.flatten([localCircleStyle, circleStyle])}>
      <View
        style={StyleSheet.flatten([styles.overflow, localCircleStyle, { borderRadius: localSize / 2 }, overflowStyle])}
      >
        <Text style={StyleSheet.flatten([styles.overflowLabel, { fontSize: localSize * 0.4 }, overflowLabelStyle])}>
          +{overflow}
        </Text>
      </View>
    </View>
  );
}
