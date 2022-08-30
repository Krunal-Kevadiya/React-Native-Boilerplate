import React, { useCallback, useRef } from 'react';

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
