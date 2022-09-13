import React, { useMemo } from 'react';
import { AppConst } from '@constants';
import { useDeepCompareMemoize, checkDeps } from '@hooks-util';

export default function useDeepCompareMemo<T>(factory: () => T, dependencies: React.DependencyList) {
  if (AppConst.isDevelopment) {
    checkDeps(dependencies, 'useDeepCompareMemo');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, useDeepCompareMemoize(dependencies));
}
