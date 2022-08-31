import { ImageStyle, LayoutChangeEvent, TextStyle, ViewStyle } from 'react-native';
import { XmlProps } from 'react-native-svg';
import { SvgIconPropsStyle, ImageIconPropsStyle, OtherIconPropsStyle } from '../../Icon';

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
