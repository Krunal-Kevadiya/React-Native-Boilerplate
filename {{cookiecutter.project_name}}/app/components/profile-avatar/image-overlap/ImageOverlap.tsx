import omit from 'lodash/omit';
import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { Icon } from '../../icon';
import styleSheet from './ImageOverlapStyles';
import type { ImageOverlapPropsType } from './ImageOverlapTypes';
import type { XmlProps } from 'react-native-svg';

/**
 * A component that overlays an image on top of another image.
 * @param {ImageOverlapPropsType} props - the props for the component.
 * @returns {React.ReactElement} A React Element..
 */
export default function ImageOverlap({ source, size, style, svgStyle }: ImageOverlapPropsType): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const localStyle: ViewStyle = omit(StyleSheet.flatten(style), 'marginTop');

  return (
    <View style={StyleSheet.flatten([localStyle, styles.imageOverlap])}>
      <Icon
        type="svg"
        size={size}
        source={source}
        svgStyle={StyleSheet.flatten([styles.svgColor as XmlProps, svgStyle])}
      />
    </View>
  );
}
