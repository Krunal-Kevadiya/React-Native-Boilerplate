import isEqual from 'lodash/isEqual';
import React, { useRef } from 'react';

export function checkDeps(deps: React.DependencyList, name: string) {
  const reactHookName: string = `React.${name.replace(/DeepCompare/, '')}`;

  if (!deps || deps.length === 0) {
    throw new Error(`${name} should not be used with no dependencies. Use ${reactHookName} instead.`);
  }
}

export default function useDeepCompareMemoize(value: React.DependencyList): React.DependencyList {
  const ref = useRef<React.DependencyList>([]);

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
