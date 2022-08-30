import { useEffect, useRef } from 'react';
import { isPresentValue } from '@utils';

export default function useInterval(callback: () => void, delay: number): void {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (isPresentValue(delay)) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
