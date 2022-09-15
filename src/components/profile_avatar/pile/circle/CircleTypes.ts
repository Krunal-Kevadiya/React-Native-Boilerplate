import { UserResponse } from '@models';

import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
export type CirclePropsType = {
  circleStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  overflowLabelStyle?: TextStyle;
  circleSize: number;
  face?: UserResponse;
  delay?: number;
};
