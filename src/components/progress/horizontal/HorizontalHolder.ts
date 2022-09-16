import type { HorizontalProgressHandleType } from './HorizontalTypes';

export default class HorizontalProgressHolder {
  static i: number = 0.0;

  static handleTimeInterval?: ReturnType<typeof setInterval> = undefined;

  static handleTimeout?: ReturnType<typeof setTimeout> = undefined;

  static horizontalProgress: HorizontalProgressHandleType | null = null;

  static setHorizontalProgress(horizontalProgress: HorizontalProgressHandleType | null) {
    if (horizontalProgress) {
      this.horizontalProgress = horizontalProgress;
    }
  }

  static clearHorizontalProgress() {
    this.horizontalProgress = null;
  }

  static setProgress(progress: number) {
    this.horizontalProgress?.setProgress(progress);
  }

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

  static clearProgress() {
    this.horizontalProgress?.clearProgress();
  }
}
