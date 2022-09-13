import type { ImageStyle, ViewStyle } from 'react-native';
import type { XmlProps } from 'react-native-svg';

export type SvgIconPropsStyle = { type?: 'svg'; source?: string; style?: ViewStyle; svgStyle?: XmlProps };
export type ImageIconPropsStyle = { type?: 'image'; source?: number; style?: ImageStyle; svgStyle?: never };
export type OtherIconPropsStyle = { type?: never; source?: never; style?: ViewStyle; svgStyle?: never };

export type IconPropsType = Partial<{
  size: number;
}> &
  (SvgIconPropsStyle | ImageIconPropsStyle | OtherIconPropsStyle);
