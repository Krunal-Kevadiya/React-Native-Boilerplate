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
    cancel() {
      hasCanceled = true;
    }
  };
}
