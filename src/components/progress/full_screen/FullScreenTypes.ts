/**
 * A type that represents the full screen progress handle.
 * @typedef {object} FullScreenProgressHandleType
 * @property {() => void} show - A function that shows the full screen progress handle.
 * @property {() => void} hide - A function that hides the full screen progress handle.
 */
export type FullScreenProgressHandleType = Required<{
  show: () => void;
  hide: () => void;
}>;
