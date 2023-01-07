import type { FullScreenProgressHandleType } from './FullScreenTypes';

/**
 * A class that holds the full screen progress handle.
 */
export default class FullScreenProgressHolder {
  static fullScreenProgress: FullScreenProgressHandleType | null = null;

  /**
   * This function sets the fullScreenProgress property of the class to the value of the
   * fullScreenProgress parameter
   * @param {FullScreenProgressHandleType | null} fullScreenProgress - FullScreenProgressHandleType |
   * null
   */
  static setFullScreenProgress(fullScreenProgress: FullScreenProgressHandleType | null): void {
    if (fullScreenProgress) {
      this.fullScreenProgress = fullScreenProgress;
    }
  }

  /**
   * It clears the full screen progress bar
   */
  static clearFullScreenProgress(): void {
    this.fullScreenProgress = null;
  }

  /**
   * It show the progress bar.
   */
  static show(): void {
    this.fullScreenProgress?.show();
  }

  /**
   * It hides the progress bar.
   */
  static hide(): void {
    this.fullScreenProgress?.hide();
  }
}
