import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';

import { isPresentValue } from '@utils';

import { Icon } from '../../icon';

import styleSheet from './CenterSideStyles';

import type { CenterSidePropsType } from './CenterSideTypes';

/**
 * A header centered component.
 * @param {string} label - The label to display on the button.
 * @param {Function} onPress - The function to call when the button is pressed.
 * @param {ViewStyle} viewStyle - The style to apply to the view.
 * @param {TextStyle} textStyle - The style to apply to the text.
 * @param {ViewStyle} svgStyle - The style to apply to the icon.
 * @param {ImageStyle} imageStyle - The style to apply to the image.
 * @returns {React.ReactElement} A React Element.
 */
export default function CenterSide({
  label,
  onPress,
  viewStyle,
  textStyle,
  svgStyle,
  imageStyle,
  isLeftAlign,
  ...OtherProps
}: CenterSidePropsType): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const object: Record<string, any> = {
    style: StyleSheet.flatten([styles.imageTitle, imageStyle, !isLeftAlign && styles.centerImageTitle]),
    svgStyle: svgStyle
  };

  return (
    <Pressable
      style={StyleSheet.flatten([styles.centerSide, viewStyle, !isLeftAlign && styles.centerContainerSide])}
      onPress={onPress}
    >
      {isPresentValue(label) && (
        <Text style={StyleSheet.flatten([styles.textTitle, textStyle, !isLeftAlign && styles.centerTextTitle])}>
          {label}
        </Text>
      )}
      {isPresentValue(OtherProps.type) && <Icon size={24} {...OtherProps} {...object} />}
    </Pressable>
  );
}
