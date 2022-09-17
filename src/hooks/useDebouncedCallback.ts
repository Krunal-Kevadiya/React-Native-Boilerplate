import { useEffect, useMemo, useRef } from 'react';

/**
 * A debounce config type.
 * @param {CallOptions} options - the options for the function call
 */
export type CallOptions = {
  leading?: boolean;
  trailing?: boolean;
};

/**
 * A debounce config type.
 * @param {number} [maxWait=5000] - the maximum amount of time to wait for the function call.
 */
export type Options = {
  maxWait?: number;
} & CallOptions;

/**
 * A debounce config type.
 * @typedef {Object} ControlFunctions
 * @property {Function} cancel - A function that cancels the filter.
 * @property {Function} flush - A function that flushes the filter.
 * @property {Function} isPending - A function that returns whether the filter is pending.
 */
export type ControlFunctions = {
  cancel: () => void;
  flush: () => void;
  isPending: () => boolean;
};

/**
 * Subsequent calls to the debounced function `debounced.callback` return the result of the last func invocation.
 * Note, that if there are no previous invocations it's mean you will get undefined. You should check it in your code properly.
 */
export type DebouncedState<T extends (...args: any[]) => ReturnType<T>> = {
  (...args: Parameters<T>): ReturnType<T> | undefined;
} & ControlFunctions;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked, or until the next browser frame is drawn. The debounced function
 * comes with a `cancel` method to cancel delayed `func` invocations and a
 * `flush` method to immediately invoke them. Provide `options` to indicate
 * whether `func` should be invoked on the leading and/or trailing edge of the
 * `wait` timeout. The `func` is invoked with the last arguments provided to the
 * debounced function. Subsequent calls to the debounced function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
 * invocation will be deferred until the next frame is drawn (typically about
 * 16ms).
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `debounce` and `throttle`.
 *
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0]
 *  The number of milliseconds to delay; if omitted, `requestAnimationFrame` is
 *  used (if available, otherwise it will be setTimeout(...,0)).
 * @param {Object} [options={}] The options object.
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.leading=false]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {number} [options.maxWait]
 *  Specify invoking on the trailing edge of the timeout.
 * @param {boolean} [options.trailing=true]
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * const resizeHandler = useDebouncedCallback(calculateLayout, 150);
 * window.addEventListener('resize', resizeHandler)
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * const clickHandler = useDebouncedCallback(sendMail, 300, {
 *   leading: true,
 *   trailing: false,
 * })
 * <button onClick={clickHandler}>click me</button>
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * const debounced = useDebouncedCallback(batchLog, 250, { 'maxWait': 1000 })
 * const source = new EventSource('/stream')
 * source.addEventListener('message', debounced)
 *
 * // Cancel the trailing debounced invocation.
 * window.addEventListener('popstate', debounced.cancel)
 *
 * // Check for pending invocations.
 * const status = debounced.pending() ? "Pending..." : "Ready"
 */
export default function useDebouncedCallback<T extends (...args: any[]) => ReturnType<T>>(
  func: T,
  wait: number = 0,
  options?: Options
): DebouncedState<T> {
  const lastCallTime = useRef<number>();
  const lastInvokeTime = useRef<number>(0);
  const timerId = useRef<number>();
  const lastArgs = useRef<any>();
  const lastThis = useRef<any>();
  const result = useRef<ReturnType<T>>();
  const funcRef = useRef(func);
  const mounted = useRef<boolean>(true);

  funcRef.current = func;

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  // @ts-ignore
  const useRAF = !wait && wait !== 0 && typeof windows !== 'undefined';

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  wait = +wait || 0;
  const localOptions: Options = options || { maxWait: 0 };

  const leading = !!localOptions.leading;
  const trailing = 'trailing' in localOptions ? !!localOptions.trailing : true; // `true` by default
  const maxing = 'maxWait' in localOptions;
  const maxWait: number = maxing ? Math.max(+(localOptions.maxWait || 0), wait) : 0;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // You may have a question, why we have so many code under the useMemo definition.
  //
  // This was made as we want to escape from useCallback hell and
  // not to initialize a number of functions each time useDebouncedCallback is called.
  //
  // It means that we have less garbage for our GC calls which improves performance.
  // Also, it makes this library smaller.
  //
  // And the last reason, that the code without lots of useCallback with deps is easier to read.
  // You have only one place for that.
  const debounced = useMemo(() => {
    /**
     * Invokes the function that was passed in.
     * @param {number} time - the time to invoke the function at.
     * @returns The result of the function.
     */
    const invokeFunc = (time: number) => {
      const args = lastArgs.current;
      const thisArg = lastThis.current;

      lastArgs.current = lastThis.current = undefined;
      lastInvokeTime.current = time;

      return (result.current = funcRef.current.apply(thisArg, args));
    };

    /**
     * Starts a timer that will call the given function after the given amount of time.
     * @param {() => void} pendingFunc - the function to call after the given amount of time.
     * @param {number} argWait - the amount of time to wait before calling the function.
     * @returns None
     */
    const startTimer = (pendingFunc: () => void, argWait: number) => {
      if (useRAF && timerId.current !== undefined) {
        cancelAnimationFrame(timerId.current);
      }
      timerId.current = useRAF ? requestAnimationFrame(pendingFunc) : setTimeout(pendingFunc, argWait);
    };

    /**
     * Determines if the function should be invoked based on the time since the last call.
     * @param {number} time - the current time since the epoch
     * @returns {boolean} - true if the function should be invoked, false otherwise
     */
    const shouldInvoke = (time: number) => {
      if (!mounted.current) {
        return false;
      }

      const timeSinceLastCall = time - (lastCallTime.current ?? 0);
      const timeSinceLastInvoke = time - lastInvokeTime.current;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (
        !lastCallTime.current ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= maxWait)
      );
    };

    /**
     * Invokes the function with the given arguments.
     * @param {number} time - the time to invoke the function with.
     * @returns The result of the function.
     */
    const trailingEdge = (time: number) => {
      timerId.current = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs.current) {
        return invokeFunc(time);
      }

      lastArgs.current = lastThis.current = undefined;
      return result.current;
    };

    /**
     * A function that is called when the timer expires.
     * @returns None
     */
    const timerExpired = () => {
      const time = Date.now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // https://github.com/xnimorz/use-debounce/issues/97
      if (!mounted.current) {
        return;
      }
      // Remaining wait calculation
      const timeSinceLastCall = time - (lastCallTime.current ?? 0);
      const timeSinceLastInvoke = time - lastInvokeTime.current;
      const timeWaiting = wait - timeSinceLastCall;
      const remainingWait = maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;

      // Restart the timer
      startTimer(timerExpired, remainingWait);
    };

    /**
     * A debounced version of the function.
     * @param {T} func - The function to debounce.
     * @param {number} wait - The amount of time to wait before invoking the function.
     * @param {boolean} [leading=false] - Whether to invoke the function on the leading edge of the wait.
     * @param {boolean} [maxing=false] - Whether to invoke the function on the trailing edge of the wait.
     * @param {boolean} [trailing=true] - Whether to invoke the function on the trailing edge of the wait.
     * @returns A debounced version of the function.
     */
    const localFunc: DebouncedState<T> = (...args: Parameters<T>): ReturnType<T> | undefined => {
      const time = Date.now();
      const isInvoking = shouldInvoke(time);

      lastArgs.current = args;
      // @ts-ignore
      lastThis.current = this;
      lastCallTime.current = time;

      if (isInvoking) {
        if (!timerId.current && mounted.current) {
          // Reset any `maxWait` timer.
          lastInvokeTime.current = lastCallTime.current;
          // Start the timer for the trailing edge.
          startTimer(timerExpired, wait);
          // Invoke the leading edge.
          return leading ? invokeFunc(lastCallTime.current) : result.current;
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          startTimer(timerExpired, wait);
          return invokeFunc(lastCallTime.current);
        }
      }
      if (!timerId.current) {
        startTimer(timerExpired, wait);
      }
      return result.current;
    };

    localFunc.cancel = () => {
      if (timerId.current) {
        if (useRAF) {
          cancelAnimationFrame(timerId.current);
        } else {
          clearTimeout(timerId.current);
        }
      }
      lastInvokeTime.current = 0;

      lastArgs.current = lastCallTime.current = lastThis.current = timerId.current = undefined;
    };

    localFunc.isPending = () => {
      return !!timerId.current;
    };

    localFunc.flush = () => {
      return !timerId.current ? result.current : trailingEdge(Date.now());
    };

    return localFunc;
  }, [leading, maxing, wait, maxWait, trailing, useRAF]);

  return debounced;
}
