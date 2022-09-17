import React, { useMemo } from 'react';

import { AppConst } from '@constants';
import { useDeepCompareMemoize, checkDeps } from '@hooks-util';

/**
 * A React hook that memoizes a function using deep compare.
 * @param {Function} factory - The function to memoize.
 * @param {React.DependencyList} dependencies - The dependencies to use for memoization.
 * @returns The memoized function.
 */
export default function useDeepCompareMemo<T>(factory: () => T, dependencies: React.DependencyList) {
  if (AppConst.isDevelopment) {
    checkDeps(dependencies, 'useDeepCompareMemo');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, useDeepCompareMemoize(dependencies));
}
