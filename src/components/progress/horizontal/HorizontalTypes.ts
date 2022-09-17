/**
 * A type that represents a handle to a horizontal progress bar.
 * @typedef {object} HorizontalProgressHandleType
 * @property {(value: number) => void} setProgress - A function that sets the progress of the progress bar.
 * @property {() => void} clearProgress - A function that clears the progress of the progress bar.
 */
export type HorizontalProgressHandleType = Required<{
  setProgress: (value: number) => void;
  clearProgress: () => void;
}>;
