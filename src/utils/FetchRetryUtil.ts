'use strict';

function isPositiveInteger(value: number) {
  return Number.isInteger(value) && value >= 0;
}

type DefaultsType = {
  retries: number;
  retryDelay?: (attempt: number, error?: Error, response?: any) => number | number;
  retryOn?: (attempt: number, error?: Error, response?: any) => number[] | number[];
};
export function fetchWithRetry(fetch: unknown, defaults: DefaultsType) {
  defaults = defaults || {};
  if (typeof fetch !== 'function') {
    throw new Error('fetch must be a function');
  }

  if (typeof defaults !== 'object') {
    throw new Error('defaults must be an object');
  }

  if (defaults.retries !== undefined && !isPositiveInteger(defaults.retries)) {
    throw new Error('retries must be a positive integer');
  }

  if (
    defaults.retryDelay !== undefined &&
    typeof defaults.retryDelay !== 'function' &&
    !isPositiveInteger(defaults.retryDelay)
  ) {
    throw new Error('retryDelay must be a positive integer or a function returning a positive integer');
  }

  if (defaults.retryOn !== undefined && !Array.isArray(defaults.retryOn) && typeof defaults.retryOn !== 'function') {
    throw new Error('retryOn property expects an array or function');
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
        throw new Error('retries must be a positive integer');
      }
    }

    if (init && init.retryDelay !== undefined) {
      if (
        (typeof init.retryDelay !== 'function' && isPositiveInteger(init.retryDelay)) ||
        typeof init.retryDelay === 'function'
      ) {
        retryDelay = init.retryDelay;
      } else {
        throw new Error('retryDelay must be a positive integer or a function returning a positive integer');
      }
    }

    if (init && init.retryOn) {
      if ((typeof init.retryOn !== 'function' && Array.isArray(init.retryOn)) || typeof init.retryOn === 'function') {
        retryOn = init.retryOn;
      } else {
        throw new Error('retryOn property expects an array or function');
      }
    }

    return new Promise(function (resolve, reject) {
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

      function retry(attempt: number, error?: Error, response?: any) {
        var delay = typeof retryDelay === 'function' ? retryDelay(attempt, error, response) : retryDelay;
        setTimeout(function () {
          wrappedFetch(++attempt);
        }, delay);
      }

      wrappedFetch(0);
    });
  };
}
