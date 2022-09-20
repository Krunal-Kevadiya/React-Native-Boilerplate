import type { SvgIconPropsStyle, ImageIconPropsStyle, OtherIconPropsStyle } from '../../icon';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { XmlProps } from 'react-native-svg';

/**
 * A type for the props of the CenterSide component.
 * @property {string} label - The label to display on the button.
 * @property {() => void} onPress - The function to call when the button is pressed.
 * @property {ViewStyle} viewStyle - The style to apply to the view.
 * @property {TextStyle} textStyle - The style to apply to the text.
 * @property {ImageStyle} imageStyle - The style to apply to the image.
 * @property {XmlProps} svgStyle - The style to apply to the SVG.
 * @property {boolean} isLeftAlign - component alignment is left, otherwise center
 */
export type CenterSidePropsType = Partial<{
  label: string;
  onPress: () => void;
  viewStyle: ViewStyle;
  textStyle: TextStyle;
  imageStyle: ImageStyle;
  svgStyle: XmlProps;
  isLeftAlign: boolean;
}> &
  (SvgIconPropsStyle | ImageIconPropsStyle | OtherIconPropsStyle);
