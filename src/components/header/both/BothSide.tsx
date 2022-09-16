import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';

import { isPresentValue } from '@utils';

import { Icon } from '../../icon';

import styleSheet from './BothSideStyle';

import type { BothSidePropsType } from './BothSideTypes';

export default function BothSide({
  label,
  onPress,
  viewStyle,
  textStyle,
  isAddMargin,
  onLayout,
  ...OtherProps
}: BothSidePropsType): React.ReactElement {
  const { styles } = useTheme(styleSheet);

  return (
    <Pressable
      style={StyleSheet.flatten([styles.bothSide, isAddMargin && styles.addMargin, viewStyle])}
      onPress={onPress}
      onLayout={onLayout}
    >
      <>
        {isPresentValue(label) && <Text style={StyleSheet.flatten([styles.textLabel, textStyle])}>{label}</Text>}
        {isPresentValue(OtherProps.type) && <Icon size={24} {...OtherProps} />}
      </>
    </Pressable>
  );
}
