import _ from 'lodash';
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { XmlProps } from 'react-native-svg';
import { useTheme } from 'rn-custom-style-sheet';
import type { ImageOverlapPropsType } from './ImageOverlap.type';
import { Icon } from '../../Icon';
import styleSheet from './ImageOverlap.style';

export default function ImageOverlap({ source, size, style, svgStyle }: ImageOverlapPropsType): React.ReactElement {
  const styles = useTheme(styleSheet);
  const localStyle: ViewStyle = _.omit(StyleSheet.flatten(style), 'marginTop');

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
