import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { XmlProps } from 'react-native-svg';
import type { SvgIconPropsStyle, ImageIconPropsStyle, OtherIconPropsStyle } from '../../Icon';

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
