import React, { useEffect, useRef } from 'react';

export default function usePrevious<T>(value: T): T | undefined {
  const ref: React.MutableRefObject<T | undefined> = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
