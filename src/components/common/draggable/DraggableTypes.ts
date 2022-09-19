import type { ViewStyle } from 'react-native';

/**
 * A type that represents the props of draggable..
 * @param {DraggablePropsType} props - The props for the draggable component.
 * @property {React.ReactElement} children - The component that you want to be draggable.
 * @property {number} maxHeight - The maximum height the draggable can be dragged to.
 * @property {number} minHeight - The minimum height of the draggable element.
 * @property {number} maxWidth - The maximum width of the draggable element.
 * @property {number} minWidth - The minimum width of the draggable element.
 * @property {number} padding - The padding around the draggable element.
 * @property {number} height - The height of the draggable element.
 * @property initValue - This is the initial position of the draggable element.
 * @property {ViewStyle} style - This is the style of the container that will be draggable.
 * @property onRelease - This is a callback function that is called when the user releases the
 * draggable element. It returns the position of the element.
 * @property onStart - This is a function that is called when the user starts dragging the component.
 */
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
