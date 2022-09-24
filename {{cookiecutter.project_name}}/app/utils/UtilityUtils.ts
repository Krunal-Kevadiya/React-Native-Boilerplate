import compact from 'lodash/compact';
import debounce from 'lodash/debounce';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import transform from 'lodash/transform';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { isPresentValue } from './StringUtils';

/**
 * If the argument is an array, return a new array with all the falsy values removed, otherwise return
 * the argument.
 * @param {any} o - the array to clean
 * @returns {any} - the cleaned array.
 */
function cleanArray(o: any) {
  return isArray(o) ? compact(o) : o;
}

/**
 * It recursively removes all `undefined` and `null` values from an object
 * @param {Record<string, any>} o - the object to clean
 * @returns {Record<string, any>} a new object with all the undefined or null values removed.
 */
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

/**
 * Trigger a haptic feedback event.
 * @returns None
 */
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

/**
 * Trigger a haptic feedback event.
 * @returns None
 */
export function triggerHapticFeedback(): void {
  debouncedHapticFeedback();
}
