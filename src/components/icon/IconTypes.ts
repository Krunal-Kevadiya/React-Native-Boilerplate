import type { ImageStyle, ViewStyle } from 'react-native';
import type { XmlProps } from 'react-native-svg';

/**
 * A type for the props of a SvgIcon component.
 * @typedef {object} SvgIconPropsStyle
 * @property {string} [type='svg'] - The type of the icon.
 * @property {string} [source] - The source of the icon.
 * @property {ViewStyle} [style] - The style of the icon.
 * @property {XmlProps} [svgStyle] - The style of the svg.
 */
export type SvgIconPropsStyle = { type?: 'svg'; source?: string; style?: ViewStyle; svgStyle?: XmlProps };

/**
 * The type of props that can be passed to the ImageIcon component.
 * @typedef {Object} ImageIconPropsStyle
 * @property {string} [type] - The type of icon to render.
 * @property {number} [source] - The source of the image to render.
 * @property {ImageStyle} [style] - The style to apply to the image.
 * @property {never} [svgStyle] - The style to apply to the SVG.
 */
export type ImageIconPropsStyle = { type?: 'image'; source?: number; style?: ImageStyle; svgStyle?: never };

/**
 * A type alias for the props of the OtherIcon component.
 * @typedef {Object} OtherIconPropsStyle
 * @property {string} [type] - The type of icon to display.
 * @property {string} [source] - The source of the icon to display.
 * @property {ViewStyle} [style] - The style of the icon.
 * @property {ViewStyle} [svgStyle] - The style of the SVG element.
 */
export type OtherIconPropsStyle = { type?: never; source?: never; style?: ViewStyle; svgStyle?: never };

/**
 * The props for the Icon component.
 * @typedef {Object} IconPropsType
 * @property {number} [size=24] - The size of the icon.
 */
export type IconPropsType = Partial<{
  size: number;
}> &
  (SvgIconPropsStyle | ImageIconPropsStyle | OtherIconPropsStyle);
