import React from 'react';
import { FlatListProps } from 'react-native';

export type BottomSheetPropsType<T> = Partial<{
  title: string;
  message: string;
  onSwipeComplete: () => void;
  onBackButtonPress: () => void;
  children: React.ReactElement;
}> &
  FlatListProps<T>;

export type BottomSheetHandleType = Required<{
  show: () => void;
  hide: () => void;
}>;
