import type { SvgIconPropsStyle, ImageIconPropsStyle, OtherIconPropsStyle } from '../../icon';
import type { ViewStyle, ImageStyle } from 'react-native';
import type { XmlProps } from 'react-native-svg';

type ImagePropsType = {
  imageStyle?: ImageStyle;
  svgStyle?: XmlProps;
  size?: number;
} & (SvgIconPropsStyle | ImageIconPropsStyle | OtherIconPropsStyle);

export type GlowPadButtonPropsType = {
  style?: ViewStyle;
  image?: ImagePropsType;
  diameter: number;
  innerDiameter: number;
  numPulses: number;
  color: string;
  speed: number;
  duration: number;
} & typeof defaultProps;

export const defaultProps = {
  diameter: 120,
  innerDiameter: 30,
  numPulses: 5,
  speed: 10,
  duration: 1000
};

export type PulseType = {
  pulseKey: string;
  diameter: number;
  opacity: number;
  centerOffset: number;
};

export type RingViewPropsType = {
  delay: number;
  color: string;
  duration: number;
  pulse: PulseType;
};
