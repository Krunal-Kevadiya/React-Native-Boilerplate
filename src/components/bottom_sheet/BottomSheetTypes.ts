import React from 'react';

import type { FlatListProps } from 'react-native';

/**
 * A type that represents the props to the bottom sheet.
 * @param {BottomSheetPropsType<T>} props - the props for the component.
 */
export type BottomSheetPropsType<T> = Partial<{
  title: string;
  message: string;
  onSwipeComplete: () => void;
  onBackButtonPress: () => void;
  children: React.ReactElement;
}> &
  FlatListProps<T>;

/**
 * A type that represents the handle to the bottom sheet.
 * @typedef {Object} BottomSheetHandleType
 * @property {() => void} show - A function that shows the bottom sheet.
 * @property {() => void} hide - A function that hides the bottom sheet.
 */
export type BottomSheetHandleType = Required<{
  show: () => void;
  hide: () => void;
}>;
