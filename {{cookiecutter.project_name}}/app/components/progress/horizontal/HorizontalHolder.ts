import type { HorizontalProgressHandleType } from './HorizontalTypes';

/**
 * A class that holds the horizontal progress bar.
 */
export default class HorizontalProgressHolder {
  static i: number = 0.0;

  static handleTimeInterval?: ReturnType<typeof setInterval> = undefined;

  static handleTimeout?: ReturnType<typeof setTimeout> = undefined;

  static horizontalProgress: HorizontalProgressHandleType | null = null;

  /**
   * Sets the horizontal progress handle to the given handle.
   * @param {HorizontalProgressHandleType | null} horizontalProgress - the handle to set the progress to.
   * @returns None
   */
  static setHorizontalProgress(horizontalProgress: HorizontalProgressHandleType | null) {
    if (horizontalProgress) {
      this.horizontalProgress = horizontalProgress;
    }
  }

  /**
   * Clears the horizontal progress bar.
   * @returns None
   */
  static clearHorizontalProgress() {
    this.horizontalProgress = null;
  }

  /**
   * Sets the progress of the horizontal progress bar.
   * @param {number} progress - the progress to set the horizontal progress bar to.
   * @returns None
   */
  static setProgress(progress: number) {
    this.horizontalProgress?.setProgress(progress);
  }

  /**
   * It sets the progress bar to a value of 0.0 and then increments it by 0.01 every 10 milliseconds
   * until it reaches 1.0.
   */
  static setProgressInSecond() {
    this.i = 0.0;
    if (this.handleTimeout) {
      clearTimeout(this.handleTimeout);
    }
    this.handleTimeInterval = setInterval(() => {
      this.i += 0.01;
      this.setProgress(this.i);
      if (this.i >= 1.0) {
        if (this.handleTimeInterval) clearInterval(this.handleTimeInterval);
        this.handleTimeout = setTimeout(() => {
          this.i = 0.0;
          this.clearProgress();
        }, 500);
      }
    }, 10);
  }

  /**
   * It clears the progress bar.
   */
  static clearProgress() {
    this.horizontalProgress?.clearProgress();
  }
}
