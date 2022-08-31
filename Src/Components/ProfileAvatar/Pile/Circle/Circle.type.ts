import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { UserResponse } from '@models';
export type CirclePropsType = {
  circleStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  overflowLabelStyle?: TextStyle;
  circleSize: number;
  face?: UserResponse;
  delay?: number;
};
