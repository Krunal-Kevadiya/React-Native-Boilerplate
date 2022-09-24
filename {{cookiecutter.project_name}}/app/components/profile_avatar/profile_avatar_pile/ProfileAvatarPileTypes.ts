import { UserResponse } from '@models';

import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

/**
 * The props for the ProfileAvatarPile component.
 * @typedef {Partial<{
 *   faces: UserResponse[],
 *   overflow: number,
 *   circleSize: number,
 *   hideOverflow: boolean,
 *   containerStyle: ViewStyle,
 *   circleStyle: ViewStyle,
 *   imageStyle: ImageStyle,
 *   overflowStyle: ViewStyle,
 *   overflowLabelStyle: TextStyle
 * }>} ProfileAvatarPilePropsType
 */
export type ProfileAvatarPilePropsType = Partial<{
  faces: UserResponse[];
  overflow: number;
  circleSize: number;
  hideOverflow: boolean;
  containerStyle: ViewStyle;
  circleStyle: ViewStyle;
  imageStyle: ImageStyle;
  overflowStyle: ViewStyle;
  overflowLabelStyle: TextStyle;
}> &
  typeof defaultProps;

export const defaultProps = {
  circleSize: 42,
  overflow: 8,
  hideOverflow: false
};
