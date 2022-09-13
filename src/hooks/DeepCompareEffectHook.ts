import React, { useEffect } from 'react';
import { AppConst } from '@constants';
import { useDeepCompareMemoize, checkDeps } from '@hooks-util';

export default function useDeepCompareEffect(effect: React.EffectCallback, dependencies: React.DependencyList) {
  if (AppConst.isDevelopment) {
    checkDeps(dependencies, 'useDeepCompareEffect');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, useDeepCompareMemoize(dependencies));
}
