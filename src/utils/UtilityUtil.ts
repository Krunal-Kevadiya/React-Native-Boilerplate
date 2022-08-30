import compact from 'lodash/compact';
import debounce from 'lodash/debounce';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import transform from 'lodash/transform';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { isPresentValue } from './StringUtil';

function cleanArray(o: any) {
  return isArray(o) ? compact(o) : o;
}

export function cleanUndefOrNull(o: Record<string, any>) {
  return transform(o, (r, v, k) => {
    var isObjects: boolean = isObject(v);
    var val = isObjects ? cleanArray(cleanUndefOrNull(v)) : v;
    var keep = isObjects ? !isEmpty(val) : Boolean(val);

    if (keep) {
      // @ts-ignore
      r[k] = val;
    }
  });
}

/**
 * Works like object.assign, but copies properties only present in source or target,
 * and also fills a property if value is undefined.
 */
export function assign<T extends Record<string, any>, K extends keyof T = keyof T>(
  target: Partial<T>,
  source: Partial<T>
): T {
  const result: Partial<T> = {};
  const totalKeys = Object.keys(target).concat(Object.keys(source)) as K[];
  for (const key of totalKeys) {
    if (!isPresentValue(result[key])) {
      result[key] = source[key] || target[key];
    }
  }
  return result as T;
}

const debouncedHapticFeedback = debounce(
  () => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true
    };
    ReactNativeHapticFeedback.trigger('notificationSuccess', options);
  },
  1000,
  { leading: true, trailing: false }
);

export function triggerHapticFeedback(): void {
  debouncedHapticFeedback();
}
