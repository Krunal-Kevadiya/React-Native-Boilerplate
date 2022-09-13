import type { ViewStyle } from 'react-native';

export type DraggablePropsType = {
  children: React.ReactElement;
  maxHeight?: number;
  minHeight?: number;
  maxWidth?: number;
  minWidth?: number;
  padding?: number;
  height?: number;
  initValue?: { x: number; y: number };
  style: ViewStyle;
  onRelease?: (position: { x: number; y: number }) => void;
  onStart?: () => void;
};
