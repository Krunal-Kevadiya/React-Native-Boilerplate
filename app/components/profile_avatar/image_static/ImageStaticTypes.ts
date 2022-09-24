import type { XmlProps } from 'react-native-svg';

/**
 * A type for the props that are passed to the Image component.
 * @typedef {Partial<{
 *   image: string;
 *   size: number;
 *   svgStyle: XmlProps;
 * }>} ImageStaticPropsType
 */
type ImageStaticPropsType = Partial<{
  image: string;
  size: number;
  svgStyle: XmlProps;
}>;

export default ImageStaticPropsType;
