import React, { type Dispatch, useCallback, useEffect, useRef, useState } from 'react';

import useDebouncedCallback, { type ControlFunctions } from './useDebouncedCallback';

function valueEquality<T>(left: T, right: T): boolean {
  return left === right;
}

function adjustFunctionValueOfSetState<T>(value: T): T | (() => T) {
  return typeof value === 'function' ? () => value : value;
}

function useStateIgnoreCallback<T>(initialState: T): [T, Dispatch<T>] {
  const [state, setState] = useState(adjustFunctionValueOfSetState(initialState));
  const setStateIgnoreCallback = useCallback((value: T) => setState(adjustFunctionValueOfSetState(value)), []);
  return [state, setStateIgnoreCallback];
}

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
