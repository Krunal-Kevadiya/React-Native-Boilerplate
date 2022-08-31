import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { XmlProps } from 'react-native-svg';
import { SvgIconPropsStyle, ImageIconPropsStyle, OtherIconPropsStyle } from '../../Icon';

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
