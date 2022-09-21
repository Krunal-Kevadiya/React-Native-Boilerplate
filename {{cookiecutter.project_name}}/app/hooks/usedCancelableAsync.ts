/**
 * A cancelable async hook that takes in a promise and returns a cancelable promise.
 * @param {Promise<T>} promise - the promise to wrap
 * @param {boolean} [cancelHandle=false] - whether or not to handle the cancelation
 * @returns {Promise<T>} - the cancelable promise
 */
export default function usedCancelableAsync<T>(
  promise: Promise<T>,
  cancelHandle: boolean = false
): { promise: Promise<T>; cancel(): void } {
  let hasCanceled: boolean = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise?.then((val) => {
      if (hasCanceled) {
        if (cancelHandle) {
          reject(new Error('AbortError'));
        }
      } else {
        resolve(val);
      }
    });
    promise?.catch((error) => {
      if (hasCanceled) {
        if (cancelHandle) {
          reject(new Error('AbortError'));
        }
      } else {
        reject(error);
      }
    });
  });

  return {
    promise: wrappedPromise,
    /**
     * Cancels the current inversion process.
     * @returns None
     */
    cancel() {
      hasCanceled = true;
    }
  };
}
