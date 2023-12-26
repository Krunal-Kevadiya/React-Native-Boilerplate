import type { TextStyle } from 'react-native';

/**
 * A type for the props of text image component.
 * @param {ImageTextPropsType} props - the props for the component
 */
type ImageTextPropsType = Partial<{
  text: string;
  textStyle: TextStyle;
}>;

export default ImageTextPropsType;
