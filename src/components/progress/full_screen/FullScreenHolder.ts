import type { FullScreenProgressHandleType } from './FullScreenType';

export default class FullScreenProgressHolder {
  static fullScreenProgress: FullScreenProgressHandleType | null = null;

  static setFullScreenProgress(fullScreenProgress: FullScreenProgressHandleType | null): void {
    if (fullScreenProgress) {
      this.fullScreenProgress = fullScreenProgress;
    }
  }

  static clearFullScreenProgress(): void {
    this.fullScreenProgress = null;
  }

  static show(): void {
    this.fullScreenProgress?.show();
  }

  static hide(): void {
    this.fullScreenProgress?.hide();
  }
}
