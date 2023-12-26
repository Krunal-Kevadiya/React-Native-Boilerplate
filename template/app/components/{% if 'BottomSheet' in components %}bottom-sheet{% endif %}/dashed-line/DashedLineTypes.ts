import type { ViewStyle } from 'react-native';

/**
 * A type that represents the props to the bottom sheet.
 * @param {BottomSheetPropsType<T>} props - the props for the component.
 * @param {'horizontal' | 'vertical'} axis - draw horizontal or vertical axis in line.
 * @param {number} dashGap - gap between 2 dash line.
 * @param {number} dashLength - number of dot add in dash line for single dash.
 * @param {number} dashThickness - thickness of dash line.
 * @param {string} dashColor - color of dash line.
 * @param {ViewStyle} dashStyle - style of dash line view.
 * @param {ViewStyle} style - dash line component container style.
 */
export type DashedLinePropsType = Partial<{
  axis: 'horizontal' | 'vertical';
  dashGap?: number;
  dashLength?: number;
  dashThickness?: number;
  dashColor: string;
  dashStyle: ViewStyle;
  style: ViewStyle;
  isDotted: boolean;
}> &
  typeof defaultProps;

export const defaultProps = {
  axis: 'horizontal',
  dashColor: '#000000',
  isDotted: false
};
