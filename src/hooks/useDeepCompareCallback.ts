import React, { useCallback } from 'react';

import { AppConst } from '@constants';
import { useDeepCompareMemoize, checkDeps } from '@hooks-util';

export default function useDeepCompareCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList
) {
  if (AppConst.isDevelopment) {
    checkDeps(dependencies, 'useDeepCompareCallback');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, useDeepCompareMemoize(dependencies));
}
