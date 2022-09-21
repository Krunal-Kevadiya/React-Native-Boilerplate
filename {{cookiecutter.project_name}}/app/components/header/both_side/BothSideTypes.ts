import type { SvgIconPropsStyle, ImageIconPropsStyle, OtherIconPropsStyle } from '../../icon';
import type { ImageStyle, LayoutChangeEvent, TextStyle, ViewStyle } from 'react-native';
import type { XmlProps } from 'react-native-svg';

/**
 * A type that represents the props that can be passed to both sides of the component.
 * @property {string} label - The label of the filter.
 * @property {boolean} isAddMargin - Whether or not to add a margin to the left of the filter.
 * @property {() => void} onPress - The function to call when the filter is pressed.
 * @property {ViewStyle} viewStyle - The style of the view that contains the filter.
 * @property {TextStyle} textStyle - The style of the text that contains the filter.
 * @property {ImageStyle} imageStyle - The style of the image that contains
 */
export type BothSidePropsType = Partial<{
  label: string;
  isAddMargin: boolean;
  onPress: () => void;
  viewStyle: ViewStyle;
  textStyle: TextStyle;
  imageStyle: ImageStyle;
  svgStyle: XmlProps;
  onLayout: (event: LayoutChangeEvent) => void;
}> &
  (SvgIconPropsStyle | ImageIconPropsStyle | OtherIconPropsStyle);
