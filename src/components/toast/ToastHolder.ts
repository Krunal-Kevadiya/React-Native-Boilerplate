import { StringConst } from '@constants';
import { isPresentValue } from '@utils';

import type { ToastHandleType } from './ToastTypes';

export default class ToastHolder {
  static DEFAULT_TIMEOUT: number = 2000;
  static toast: ToastHandleType | null = null;

  static queue: Array<string> = [];

  static isRecursiveTimeout: boolean = false;

  static setToast(toast: ToastHandleType | null): void {
    if (toast) {
      this.toast = toast;
    }
  }

  static clearToast(): void {
    this.toast = null;
  }

  static ignoreMessage(message?: string): boolean {
    if (isPresentValue(message) && message !== StringConst.apiError.cancelSaga) {
      return true;
    }
    return false;
  }

  static toastMessage(message: string, image?: number, imageTint?: string, interval?: number): void {
    if (!this.isRecursiveTimeout) {
      if (this.ignoreMessage(message)) {
        this.toast?.toastWithType(
          message.trim(),
          image,
          imageTint,
          !isPresentValue(interval) ? this.DEFAULT_TIMEOUT : interval
        );
      }
    } else {
      this.queue.push(message);
    }
  }

  static toastMessages(message: string[], image?: number, imageTint?: string, interval?: number): void {
    if (!this.isRecursiveTimeout) {
      this.queue.push(...message);
      this.isRecursiveTimeout = true;
      this.toast?.toastLifecycle((isOpen) => {
        if (!isOpen) {
          if (this.queue.length > 0) {
            const firstMessage: string | undefined = this.queue.shift();
            if (this.ignoreMessage(firstMessage)) {
              this.toast?.toastWithType(
                firstMessage?.trim(),
                image,
                imageTint,
                !isPresentValue(interval) ? this.DEFAULT_TIMEOUT : interval
              );
            }
          } else {
            this.isRecursiveTimeout = false;
          }
        }
      });
    } else {
      this.queue.push(...message);
    }
  }

  static closeToast(): void {
    this.toast?.clearToast();
  }
}
