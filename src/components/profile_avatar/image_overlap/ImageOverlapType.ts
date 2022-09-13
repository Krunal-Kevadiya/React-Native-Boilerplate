import type { ViewStyle } from 'react-native';
import type { XmlProps } from 'react-native-svg';

export type ImageOverlapPropsType = {
  source?: string;
  size?: number;
  style: ViewStyle;
  svgStyle?: XmlProps;
};
