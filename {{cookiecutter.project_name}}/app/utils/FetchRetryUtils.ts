'use strict';

import { StringConst } from '@constants';

/**
 * Checks if the given value is a positive integer.
 * @param {number} value - the value to check
 * @returns {boolean} - true if the value is a positive integer, false otherwise
 */
function isPositiveInteger(value: number) {
  return Number.isInteger(value) && value >= 0;
}

/**
 * `DefaultsType` is an object with a required `retries` property of type `number` and an optional
 * `retryDelay` property of type `(attempt: number, error?: Error, response?: any) => number | number`
 * and an optional `retryOn` property of type `(attempt: number, error?: Error, response?: any) =>
 * number[] | number[]`.
 * @property {number} retries - The number of times to retry the request.
 * @property retryDelay - A function that returns the number of milliseconds to delay before retrying
 * the request. The function is passed the number of retries (starting at 1) and the error and response
 * from the previous request.
 * @property retryOn - An array of HTTP status codes that should be retried.
 */
type DefaultsType = {
  retries: number;
  retryDelay?: (attempt: number, error?: Error, response?: any) => number | number;
  retryOn?: (attempt: number, error?: Error, response?: any) => number[] | number[];
};

/**
 * A function that takes in a fetch function and returns a new fetch function that retries the fetch
 * function up to the number of retries specified.
 * @param {Function} fetch - the fetch function to retry
 * @param {Object} defaults - the default options for the fetch function
 * @returns {Function} a new fetch function that retries the fetch function up to the number of retries specified
 */
export function fetchWithRetry(fetch: unknown, defaults: DefaultsType) {
  defaults = defaults || {};
  if (typeof fetch !== 'function') {
    throw new Error(StringConst.Message.fetchMustBeFunction);
  }

  if (typeof defaults !== 'object') {
    throw new Error(StringConst.Message.defaultsMustBeObject);
  }

  if (defaults.retries !== undefined && !isPositiveInteger(defaults.retries)) {
    throw new Error(StringConst.Message.retriesMustBePositiveInteger);
  }

  if (
    defaults.retryDelay !== undefined &&
    typeof defaults.retryDelay !== 'function' &&
    !isPositiveInteger(defaults.retryDelay)
  ) {
    throw new Error(StringConst.Message.retryDelayMustNePositiveInteger);
  }

  if (
    defaults.retryOn !== undefined &&
    !Array.isArray(defaults.retryOn) &&
    typeof defaults.retryOn !== 'function'
  ) {
    throw new Error(StringConst.Message.retryOnPropertyExpectsArrayOrFunction);
  }

  var baseDefaults = {
    retries: 3,
    retryDelay: 1000,
    retryOn: []
  };

  defaults = Object.assign(baseDefaults, defaults);

  return function fetchRetry(input: Record<string, any>, init: DefaultsType) {
    var retries = defaults.retries;
    var retryDelay = defaults.retryDelay;
    var retryOn = defaults.retryOn;

    if (init && init.retries !== undefined) {
      if (isPositiveInteger(init.retries)) {
        retries = init.retries;
      } else {
        throw new Error(StringConst.Message.retriesMustBePositiveInteger);
      }
    }

    if (init && init.retryDelay !== undefined) {
      if (
        (typeof init.retryDelay !== 'function' && isPositiveInteger(init.retryDelay)) ||
        typeof init.retryDelay === 'function'
      ) {
        retryDelay = init.retryDelay;
      } else {
        throw new Error(StringConst.Message.retryDelayMustNePositiveInteger);
      }
    }

    if (init && init.retryOn) {
      if (
        (typeof init.retryOn !== 'function' && Array.isArray(init.retryOn)) ||
        typeof init.retryOn === 'function'
      ) {
        retryOn = init.retryOn;
      } else {
        throw new Error(StringConst.Message.retryOnPropertyExpectsArrayOrFunction);
      }
    }

    return new Promise(function (resolve, reject) {
      /**
       * A wrapper around the fetch function that retries the request if it fails.
       * @param {number} retries - the number of times to retry the request
       * @param {number} retryDelay - the number of milliseconds to wait before retrying
       * @param {string} retryOn - the status code or function to retry on
       * @returns A promise that resolves to the response object.
       */
      var wrappedFetch = function (attempt: number) {
        fetch(input, init)
          .then(function (response: any) {
            if (Array.isArray(retryOn) && retryOn.indexOf(response.status) === -1) {
              resolve(response);
            } else if (typeof retryOn === 'function') {
              try {
                return Promise.resolve(retryOn(attempt, undefined, response))
                  .then(function (retryOnResponse) {
                    if (retryOnResponse) {
                      // eslint-disable-next-line @typescript-eslint/no-use-before-define
                      retry(attempt, undefined, response);
                    } else {
                      resolve(response);
                    }
                  })
                  .catch(reject);
              } catch (error: unknown) {
                reject(error);
              }
            } else {
              if (attempt < retries) {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                retry(attempt, undefined, response);
              } else {
                resolve(response);
              }
            }
          })
          .catch(function (error: Error) {
            if (typeof retryOn === 'function') {
              try {
                Promise.resolve(retryOn(attempt, error, undefined))
                  .then(function (retryOnResponse) {
                    if (retryOnResponse) {
                      // eslint-disable-next-line @typescript-eslint/no-use-before-define
                      retry(attempt, error, undefined);
                    } else {
                      reject(error);
                    }
                  })
                  .catch(function (error1: Error) {
                    reject(error1);
                  });
              } catch (error2: unknown) {
                reject(error2);
              }
            } else if (attempt < retries) {
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              retry(attempt, error, undefined);
            } else {
              reject(error);
            }
          });
      };

      /**
       * A function that retries a fetch request.
       * @param {number} attempt - the number of attempts made so far.
       * @param {Error} [error] - the error that was thrown.
       * @param {any} [response] - the response from the fetch request.
       * @returns None
       */
      function retry(attempt: number, error?: Error, response?: any) {
        var delay =
          typeof retryDelay === 'function' ? retryDelay(attempt, error, response) : retryDelay;
        setTimeout(function () {
          wrappedFetch(++attempt);
        }, delay);
      }

      wrappedFetch(0);
    });
  };
}
