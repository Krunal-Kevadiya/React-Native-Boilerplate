import { useEffect, useRef } from 'react';

import { isPresentValue } from '@utils';

/**
 * A interval hook that allows you to use setInterval() in a functional way.
 * @param {() => void} callback - the function to call every delay milliseconds
 * @param {number} delay - the number of milliseconds to wait before calling the callback
 * @returns None
 */
export default function useInterval(callback: () => void, delay: number): void {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    /**
     * A function that is called every time the interval is updated.
     * @returns None
     */
    function tick() {
      savedCallback.current?.();
    }
    if (isPresentValue(delay)) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
