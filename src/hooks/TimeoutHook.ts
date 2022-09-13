import React, { useEffect, useRef } from 'react';
import { isPresentValue } from '@utils';

export default function useTimeout(callback: () => void, delay?: number): void {
  const savedCallback: React.MutableRefObject<(() => void) | undefined> = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (isPresentValue(delay)) {
      const id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}
