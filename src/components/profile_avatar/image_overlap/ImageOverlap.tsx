import omit from 'lodash/omit';
import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import type { ImageOverlapPropsType } from './ImageOverlapType';
import type { XmlProps } from 'react-native-svg';
import { Icon } from '../../icon';
import styleSheet from './ImageOverlapStyle';

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
