import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { isPresentValue } from '@utils';
import { Icon } from '../../icon';
import styleSheet from './HeaderButtonStyles';
import type { HeaderButtonPropsType } from './HeaderButtonTypes';

/**
 * A header button component.
 * @param {string} label - The label to display on the button.
 * @param {Function} onPress - The function to call when the button is pressed.
 * @param {ViewStyle} viewStyle - The style to apply to the view.
 * @param {TextStyle} textStyle - The style to apply to the text.
 * @param {ViewStyle} svgStyle - The style to apply to the icon.
 * @param {ImageStyle} imageStyle - The style to apply to the image.
 * @param {boolean} isLeftAlign - The alignment left or center side.
 * @param {boolean} isAddMargin - add horizontal default margin to view.
 * @param {boolean} isCenterView - identify side view or center view.
 * @returns {React.ReactElement} A React Element.
 */
export default function HeaderButton({
  label,
  onPress,
  viewStyle,
  textStyle,
  svgStyle,
  imageStyle,
  isLeftAlign,
  isAddMargin,
  isCenterView,
  ...restProps
}: HeaderButtonPropsType): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const object: Record<string, any> = {
    style: StyleSheet.flatten([styles.image, imageStyle, !isLeftAlign && styles.centerImage]),
    svgStyle: svgStyle
  };

  return (
    <Pressable
      style={StyleSheet.flatten([
        isCenterView && styles.centerView,
        isAddMargin && styles.addMargin,
        viewStyle,
        !isLeftAlign && styles.centerContainer
      ])}
      onPress={onPress}
    >
      {isPresentValue(restProps.type) && <Icon size={24} {...restProps} {...object} />}
      {isPresentValue(label) && (
        <Text style={StyleSheet.flatten([styles.text, textStyle, !isLeftAlign && styles.centerText])}>{label}</Text>
      )}
    </Pressable>
  );
}
