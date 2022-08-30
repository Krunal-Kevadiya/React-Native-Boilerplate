import type { SvgIconPropsStyle, ImageIconPropsStyle, OtherIconPropsStyle } from '../../icon';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { XmlProps } from 'react-native-svg';

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
