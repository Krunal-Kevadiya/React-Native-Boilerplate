import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, type ViewStyle } from 'react-native';
import { moderateScale, useTheme } from 'rn-custom-style-sheet';

import ProfileAvatar from '../../ProfileAvatar';

import styleSheet from './CircleStyle';

import type { CirclePropsType } from './CircleTypes';

export default function Circle({
  circleStyle,
  imageStyle,
  overflowLabelStyle,
  circleSize,
  face,
  delay
}: CirclePropsType): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
  const localSize: number = moderateScale(circleSize);

  const localCircleStyle: ViewStyle = {
    width: localSize,
    height: localSize,
    borderRadius: localSize / 2
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      delay,
      useNativeDriver: false
    }).start();
  }, [delay, fadeAnim]);

  return (
    <Animated.View style={StyleSheet.flatten([localCircleStyle, { opacity: fadeAnim }, styles.container, circleStyle])}>
      <ProfileAvatar
        style={StyleSheet.flatten([localCircleStyle, styles.overflow, imageStyle])}
        url={face?.getProfileImage}
        text={face?.getProfileName}
        textStyle={StyleSheet.flatten([
          styles.overflowLabel,
          {
            fontSize: localSize * 0.4
          },
          overflowLabelStyle
        ])}
      />
    </Animated.View>
  );
}
