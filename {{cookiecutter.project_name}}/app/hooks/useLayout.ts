import { useCallback, useState } from 'react';
import type { LayoutChangeEvent, LayoutRectangle } from 'react-native';

/**
 * layout hook that returns a function that can be used to set the layout of a component.
 * @returns A function that can be used to set the layout of a component.
 */
export default function useLayout(): [
  (e: LayoutChangeEvent) => void,
  number,
  number,
  number,
  number
] {
  const [layout, setLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });

  const onLayout = useCallback<(e: LayoutChangeEvent) => void>(
    (e: LayoutChangeEvent) => setLayout(e.nativeEvent.layout),
    []
  );

  return [onLayout, layout.x, layout.y, layout.width, layout.height];
}
