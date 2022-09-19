import type { SvgIconPropsStyle, ImageIconPropsStyle, OtherIconPropsStyle } from '../../icon';
import type { ViewStyle, ImageStyle } from 'react-native';
import type { XmlProps } from 'react-native-svg';

/**
 * The type of the image props object.
 * @typedef {Object} ImagePropsType
 * @property {ImageStyle} [imageStyle] - The style of the image.
 * @property {XmlProps} [svgStyle] - The style of the SVG.
 * @property {number} [size] - The size of the image.
 */
type ImagePropsType = {
  imageStyle?: ImageStyle;
  svgStyle?: XmlProps;
  size?: number;
} & (SvgIconPropsStyle | ImageIconPropsStyle | OtherIconPropsStyle);

/**
 * The props for the GlowPadButton component.
 * @typedef {Object} GlowPadButtonPropsType
 * @property {ViewStyle} [style] - The style of the button.
 * @property {ImagePropsType} [image] - The image to display in the button.
 * @property {number} diameter - The diameter of the button.
 * @property {number} innerDiameter - The diameter of the inner circle.
 * @property {number} numPulses - The number of pulses to display.
 * @property {string} color - The color of the button pulse.
 * @property {number} speed - The speed of the button pulse.
 */
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

/**
 * A type for the pulse object.
 * @typedef {object} PulseType
 * @property {string} pulseKey - the key of the pulse.
 * @property {number} diameter - the diameter of the pulse.
 * @property {number} opacity - the opacity of the pulse.
 * @property {number} centerOffset - the offset of the pulse from the center.
 */
export type PulseType = {
  pulseKey: string;
  diameter: number;
  opacity: number;
  centerOffset: number;
};

/**
 * The props for the RingView component.
 * @typedef {Object} RingViewPropsType
 * @property {number} delay - The delay in milliseconds before the animation begins.
 * @property {string} color - The color of the ring.
 * @property {number} duration - The duration of the animation in milliseconds.
 * @property {PulseType} pulse - The pulse type.
 */
export type RingViewPropsType = {
  delay: number;
  color: string;
  duration: number;
  pulse: PulseType;
};
