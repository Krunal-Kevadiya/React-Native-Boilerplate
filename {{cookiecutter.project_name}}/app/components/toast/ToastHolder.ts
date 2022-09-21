import { StringConst } from '@constants';
import { isPresentValue } from '@utils';

import type { ToastHandleType } from './ToastTypes';

/**
 * A class that holds the toast handle and handles the toast messages.
 */
export default class ToastHolder {
  static DEFAULT_TIMEOUT: number = 2000;
  static toast: ToastHandleType | null = null;

  static queue: Array<string> = [];

  static isRecursiveTimeout: boolean = false;

  /**
   * It sets the toast property to the toast argument if the toast argument is not null
   * @param {ToastHandleType | null} toast - ToastHandleType | null
   */
  static setToast(toast: ToastHandleType | null): void {
    if (toast) {
      this.toast = toast;
    }
  }

  /**
   * It clears the toast.
   */
  static clearToast(): void {
    this.toast = null;
  }

  /**
   * If the message is present and not equal to the cancelSaga message, then return true
   * @param {string} [message] - The message to be displayed.
   * @returns A boolean value.
   */
  static ignoreMessage(message?: string): boolean {
    if (isPresentValue(message) && message !== StringConst.ApiError.cancelSaga) {
      return true;
    }
    return false;
  }

  /**
   * If the message is not in the ignore list, then show the message
   * @param {string} message - string - The message to display
   * @param {number} [image] - The image to display.
   * @param {string} [imageTint] - The color of the image.
   * @param {number} [interval] - The time in milliseconds that the toast will be displayed.
   */
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

  /**
   * If the toast is not open, then show the first message in the queue. If the toast is open, then add
   * the message to the queue
   * @param {string[]} message - string[] - An array of messages to be displayed.
   * @param {number} [image] - The image to display in the toast.
   * @param {string} [imageTint] - string - The color of the image.
   * @param {number} [interval] - The time in milliseconds that the toast will be displayed.
   */
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

  /**
   * It closes the toast.
   */
  static closeToast(): void {
    this.toast?.clearToast();
  }
}
