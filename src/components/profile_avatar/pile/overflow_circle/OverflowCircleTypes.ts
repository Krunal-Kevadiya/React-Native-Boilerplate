import type { TextStyle, ViewStyle } from 'react-native';

/**
 * `OverflowCirclePropsType` is an type object with optional properties `overflow`, `circleStyle`,
 * `overflowStyle`, `overflowLabelStyle`, and `circleSize`.
 * @property {number} overflow - The number of items that are overflowing.
 * @property {ViewStyle} circleStyle - The style of the circle that will be displayed.
 * @property {ViewStyle} overflowStyle - The style of the overflow circle.
 * @property {TextStyle} overflowLabelStyle - The style of the text that shows the number of items that
 * are overflowing.
 * @property {number} circleSize - The size of the circle.
 */
export type OverflowCirclePropsType = {
  overflow?: number;
  circleStyle?: ViewStyle;
  overflowStyle?: ViewStyle;
  overflowLabelStyle?: TextStyle;
  circleSize: number;
};
