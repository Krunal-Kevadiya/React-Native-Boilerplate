import type { ViewStyle } from 'react-native';
import type { ImageStyle as FastImageStyle } from 'react-native-fast-image';

/**
 * `ImageUrlPropsType` is an object with optional `url`, `style`, `imageStyle` and `onLoading`
 * properties.
 * @property {string} url - The url of the image to be displayed.
 * @property {ViewStyle} style - The style of the container view.
 * @property {FastImageStyle} imageStyle - This is the style of the image.
 * @property onLoading - A callback function that will be called when the image is loading.
 */
export type ImageUrlPropsType = {
  url?: string;
  style?: ViewStyle;
  imageStyle: FastImageStyle;
  onLoading: (loading: boolean) => void;
};
