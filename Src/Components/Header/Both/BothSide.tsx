import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { isNotNullOrEmpty } from '@utils';
import type { BothSidePropsType } from './BothSide.type';
import { Icon } from '../../Icon';
import styleSheet from './BothSide.style';

export default function BothSide({
  label,
  onPress,
  viewStyle,
  textStyle,
  isAddMargin,
  onLayout,
  ...OtherProps
}: BothSidePropsType): React.ReactElement {
  const styles = useTheme(styleSheet);

  return (
    <Pressable
      style={StyleSheet.flatten([styles.bothSide, isAddMargin && styles.addMargin, viewStyle])}
      onPress={onPress}
      onLayout={onLayout}
    >
      <>
        {isNotNullOrEmpty(label) && <Text style={StyleSheet.flatten([styles.textLabel, textStyle])}>{label}</Text>}
        {isNotNullOrEmpty(OtherProps.type) && <Icon size={24} {...OtherProps} />}
      </>
    </Pressable>
  );
}
