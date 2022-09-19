import type { ViewStyle } from 'react-native';
import type { XmlProps } from 'react-native-svg';

/**
 * A type for the props of overlaps image.
 * @param {ImageOverlapPropsType} props - the props for the component
 */
export type ImageOverlapPropsType = {
  source?: string;
  size?: number;
  style: ViewStyle;
  svgStyle?: XmlProps;
};
