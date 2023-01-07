import { useCallback, useEffect, useRef, useState } from 'react';
import usePrevious from './usePrevious';
import useWillUnmount from './useWillUnmount';

const defaultOptions = {
  cancelOnUnmount: true,
  cancelOnConditionChange: true
};

/**
 * An async-utility hook that accepts a callback function and a delay time (in milliseconds), then delays the
 * execution of the given function by the defined time from when the condition verifies.
 * @param {() => void} fn - The function to run when the timeout is triggered.
 * @param {number} milliseconds - The number of milliseconds to wait before running the function.
 * @param {any} condition - The condition that must be true for the timeout to run.
 * @param {TimeoutOptions} [options={}] - The options for the timeout.
 * @returns A tuple containing the isCleared state and a function to clear the timeout.
 */
export default function useConditionalTimeout(
  fn: () => void,
  milliseconds: number,
  condition: any,
  options = defaultOptions
): [boolean, () => void] {
  const opts = { ...defaultOptions, ...(options ?? {}) };
  const timeout = useRef<number>();
  const callback = useRef<() => void>(fn);
  const [isCleared, setIsCleared] = useState<boolean>(false);
  const prevCondition = usePrevious<any | undefined>(condition);

  // the clear method
  const clear = useCallback<() => void>(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      setIsCleared(true);
    }
  }, []);

  // if the provided function changes, change its reference
  useEffect(() => {
    if (typeof fn === 'function') {
      callback.current = fn;
    }
  }, [fn]);

  // when the milliseconds change, reset the timeout
  useEffect(() => {
    if (condition && typeof milliseconds === 'number') {
      timeout.current = setTimeout(() => {
        callback.current();
      }, milliseconds);
    }
  }, [condition, milliseconds]);

  // when the condition change, clear the timeout
  useEffect(() => {
    if (prevCondition && condition !== prevCondition && opts.cancelOnConditionChange) {
      clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition, options]);

  // when component unmount clear the timeout
  useWillUnmount(() => {
    if (opts.cancelOnUnmount) {
      clear();
    }
  });

  return [isCleared, clear];
}
