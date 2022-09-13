import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ImageStyle as FastImageStyle } from 'react-native-fast-image';

type IndicatorFnType = (progress: number, indeterminate: boolean, { ...indicatorProps }: object) => React.ReactElement;
export type ImageProgressPropsType = {
  children?: React.ReactElement;
  errorContainerStyle?: StyleProp<ViewStyle>;
  indicator?: React.Component | IndicatorFnType;
  indicatorContainerStyle?: StyleProp<ViewStyle>;
  indicatorProps?: object;
  renderIndicator?: (progress: number, indeterminate: boolean) => React.ReactElement;
  renderError?: (error: Error) => React.ReactElement;
  source?: any;
  style?: ViewStyle;
  imageStyle: FastImageStyle;
  threshold?: number;
};

export type ImageProgressStateType = {
  sourceKey?: string;
  error?: Error | null;
  loading?: boolean;
  progress: number;
  thresholdReached?: boolean;
};
