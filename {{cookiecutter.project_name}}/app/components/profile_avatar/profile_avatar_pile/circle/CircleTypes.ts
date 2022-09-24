import { UserResponse } from '@models';

import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
/**
 * The props for the Circle component.
 * @typedef {Object} CirclePropsType
 * @property {ViewStyle} [circleStyle] - The style of the circle.
 * @property {ImageStyle} [imageStyle] - The style of the image.
 * @property {TextStyle} [overflowLabelStyle] - The style of the overflow label.
 * @property {number} circleSize - The size of the circle.
 * @property {UserResponse} [face] - The user's face.
 * @property {number} [delay] - The delay of the animation.
 */
export type CirclePropsType = {
  circleStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  overflowLabelStyle?: TextStyle;
  circleSize: number;
  face?: UserResponse;
  delay?: number;
};
