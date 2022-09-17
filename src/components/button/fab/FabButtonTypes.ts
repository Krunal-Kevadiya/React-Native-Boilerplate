import type { SvgIconPropsStyle, ImageIconPropsStyle, OtherIconPropsStyle } from '../../icon';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { XmlProps } from 'react-native-svg';

/**
 * The props for the FabButton component.
 * @typedef {Object} FabButtonPropsType
 * @property {() => void} [onPress] - The function to call when the button is pressed.
 * @property {number} [size=50] - The size of the button.
 * @property {ViewStyle} [style] - The style of the button.
 * @property {ViewStyle} [containerStyle] - The style of the container of the button.
 * @property {ImageStyle} [imageStyle] - The style of the image of the button.
 * @property {XmlProps} [svgStyle] - The style of the svg of the button.
 * @property {string} [text] - The label of the button.
 * @property {TextStyle} [textStyle] - The style of the label of the button.
 * @property {boolean} [isRight] - define a position of image where a place based on label.
 * @property {boolean} [isLoading] - Indicator of seen loader or not.
 */
export type FabButtonPropsType = Partial<{
  onPress: () => void;
  size: number;
  style: ViewStyle;
  containerStyle: ViewStyle;
  imageStyle: ImageStyle;
  svgStyle: XmlProps;
  text: string;
  textStyle: TextStyle;
  isRight: boolean;
  isLoading: boolean;
}> &
  (SvgIconPropsStyle | ImageIconPropsStyle | OtherIconPropsStyle);
