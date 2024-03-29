import React from 'react';
import { type ImageStyle, TextInput, type TextStyle, type ViewStyle } from 'react-native';
import type { SvgIconPropsStyle, ImageIconPropsStyle, OtherIconPropsStyle } from '../icon';
import type { XmlProps } from 'react-native-svg';

type TextInputPropsType = React.ComponentProps<typeof TextInput>;

/**
 * A type for the props of the icon.
 * @param {IconPropsType} props - the props for the component.
 */
type IconPropsType = Partial<{
  label: string;
  isAddMargin: boolean;
  onPress: () => void;
  viewStyle: ViewStyle;
  textStyle: TextStyle;
  imageStyle: ImageStyle;
  svgStyle: XmlProps;
}> &
  (SvgIconPropsStyle | ImageIconPropsStyle | OtherIconPropsStyle);

/**
 * A type for the props of the header component.
 * @param {LocalHeaderPropsType} props - the props for the component.
 */
type LocalHeaderPropsType = {
  left: IconPropsType;
  customLeftView: React.ReactElement;
  center: IconPropsType;
  right: IconPropsType;
  customRightView: React.ReactElement;

  isLowerCase: boolean;
  isSearch: boolean;
  labelCancel: string;
  onSearchQuery: (search: string) => void;
  handleCancel: () => void;

  isBottomLine: boolean;
  isLeftAlign: boolean;
};
export type HeaderPropsType = Partial<LocalHeaderPropsType> & TextInputPropsType;

export const defaultProps = {
  isLowerCase: true,
  isSearch: false,
  isBottomLine: true,
  isLeftAlign: true
};
