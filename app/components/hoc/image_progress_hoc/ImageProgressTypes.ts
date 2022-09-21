import React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';
import type { ImageStyle as FastImageStyle } from 'react-native-fast-image';

/**
 * A function that takes in a progress value and returns a React element that can be used as an indicator function type.
 * @param {number} progress - the progress value to use.
 * @param {boolean} indeterminate - whether the progress is indeterminate.
 * @param {object} indicatorProps - the props to pass to the indicator.
 * @returns {React.ReactElement} - the indicator element.
 */
type IndicatorFnType = (progress: number, indeterminate: boolean, { ...indicatorProps }: object) => React.ReactElement;

/**
 * A props type of component that renders an image with a loading indicator.
 * @param {ImageProgressPropsType} props - the props for the component
 */
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

/**
 * The state of the image progress.
 * @property {string | undefined} sourceKey - The source key of the image.
 * @property {Error | null} error - The error that occurred while loading the image.
 * @property {boolean} loading - Whether the image is loading.
 * @property {number} progress - The progress of the image loading.
 * @property {boolean} [thresholdReached] - Whether the progress has reached the threshold.
 */
export type ImageProgressStateType = {
  sourceKey?: string;
  error?: Error | null;
  loading?: boolean;
  progress: number;
  thresholdReached?: boolean;
};
