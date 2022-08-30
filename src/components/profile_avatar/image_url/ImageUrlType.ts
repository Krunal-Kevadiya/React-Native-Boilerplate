import type { ViewStyle } from 'react-native';
import type { ImageStyle as FastImageStyle } from 'react-native-fast-image';

export type ImageUrlPropsType = {
  url?: string;
  style?: ViewStyle;
  imageStyle: FastImageStyle;
  onLoading: (loading: boolean) => void;
};
