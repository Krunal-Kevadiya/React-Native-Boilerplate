import React, { useCallback, useRef } from 'react';

/**
 * It returns a ref and a function that can be used to update the ref
 * @param {T} handlerValue - the initial value of the handler
 * @returns {[React.MutableRefObject<T>, (nextCallback: T) => void]} - a tuple containing a reference to the handler
 * value and a function that can be used to set the handler value.
 */
export default function useCreateHandlerSetter<T>(
  handlerValue: T
): [React.MutableRefObject<T>, (nextCallback: T) => void] {
  const handlerRef = useRef<T>(handlerValue);

  const setHandler = useCallback<(nextCallback: T) => void>(
    (nextCallback: T) => {
      handlerRef.current = nextCallback;
    },
    [handlerRef]
  );

  return [handlerRef, setHandler];
}
