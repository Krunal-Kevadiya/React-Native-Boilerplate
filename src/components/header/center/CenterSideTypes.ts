import type { SvgIconPropsStyle, ImageIconPropsStyle, OtherIconPropsStyle } from '../../icon';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { XmlProps } from 'react-native-svg';

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
