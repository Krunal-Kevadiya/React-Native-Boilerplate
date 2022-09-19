import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';

import { isPresentValue } from '@utils';

import { Icon } from '../../icon';

import styleSheet from './BothSideStyles';

import type { BothSidePropsType } from './BothSideTypes';

/**
 * A header left and right side component that renders a button with a label and an icon.
 * @param {string} label - the label to display on the button.
 * @param {Function} onPress - the function to call when the button is pressed.
 * @param {ViewStyle} viewStyle - the style to apply to the button.
 * @param {TextStyle} textStyle - the style to apply to the label.
 * @param {boolean} isAddMargin - whether or not to add a margin to the button.
 * @param {Function} onLayout - the function to call when the button is laid out.
 * @returns {React.ReactElement} A React Element.
 */
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
