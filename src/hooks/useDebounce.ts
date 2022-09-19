import React, { type Dispatch, useCallback, useEffect, useRef, useState } from 'react';

import useDebouncedCallback, { type ControlFunctions } from './useDebouncedCallback';

/**
 * Checks if two values are equal.
 * @param {T} left - the left value to compare
 * @param {T} right - the right value to compare
 * @returns {boolean} - true if the values are equal, false otherwise.
 */
function valueEquality<T>(left: T, right: T): boolean {
  return left === right;
}

/**
 * Takes in a value and returns the value if it is not a function, or a function that returns the value if it is a function.
 * @param {T} value - the value to adjust
 * @returns {T | (() => T)} - the adjusted value
 */
function adjustFunctionValueOfSetState<T>(value: T): T | (() => T) {
  return typeof value === 'function' ? () => value : value;
}

/**
 * A custom hook that returns a state and a dispatch function that ignores the callback.
 * @param {T} initialState - the initial state of the state variable.
 * @returns {[T, Dispatch<T>]} - a tuple containing the state and a dispatch function that ignores the callback.
 */
function useStateIgnoreCallback<T>(initialState: T): [T, Dispatch<T>] {
  const [state, setState] = useState(adjustFunctionValueOfSetState(initialState));
  const setStateIgnoreCallback = useCallback((value: T) => setState(adjustFunctionValueOfSetState(value)), []);
  return [state, setStateIgnoreCallback];
}

/**
 * A debounce hook that returns a tuple of the current value and a set of functions that can be used to control the value.
 * @param {T} value - the value to be debounced
 * @param {number} delay - the delay in milliseconds
 * @param {DebounceOptions} [options] - the options for the debounce
 * @returns {[T, ControlFunctions]} - a tuple of the current value and a set of functions that can be used to control the value.
 */
export default function useDebounce<T>(
  value: T,
  delay: number,
  options?: { maxWait?: number; leading?: boolean; trailing?: boolean; equalityFn?: (left: T, right: T) => boolean }
): [T, ControlFunctions] {
  const eq: (left: T, right: T) => boolean = (options && options.equalityFn) || valueEquality;

  const [state, dispatch] = useStateIgnoreCallback(value);
  const debounced = useDebouncedCallback(
    useCallback((argValue: T) => dispatch(argValue), [dispatch]),
    delay,
    options
  );
  const previousValue: React.MutableRefObject<T> = useRef(value);

  useEffect(() => {
    // We need to use this condition otherwise we will run debounce timer for the first render (including maxWait option)
    if (!eq(previousValue.current, value)) {
      debounced(value);
      previousValue.current = value;
    }
  }, [value, debounced, eq]);

  return [state, { cancel: debounced.cancel, isPending: debounced.isPending, flush: debounced.flush }];
}
