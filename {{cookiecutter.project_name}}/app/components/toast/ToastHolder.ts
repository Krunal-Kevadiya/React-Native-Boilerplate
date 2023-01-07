import isEmpty from 'lodash/isEmpty';
import type { InternalDataPropsType, ToastHandleType, ToastType } from './ToastTypes';

/**
 * A class that holds the toast handle and handles the toast messages.
 */
export default class ToastHolder {
  static DEFAULT_TIMEOUT: number = 4000;
  static toast: ToastHandleType | null = null;

  static queue: Array<InternalDataPropsType> = [];

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
    if (!isEmpty(message)) {
      return true;
    }
    return false;
  }

  /**
   * If the message is not in the ignore list, then show the message
   * @param {ToastType} type - The toast type variant to display
   * @param {string} message - string - The message to display
   * @param {string} title - string - The title to display
   * @param {number} [image] - The image to display.
   * @param {string} [imageTint] - The color of the image.
   * @param {number} [interval] - The time in milliseconds that the toast will be displayed.
   */
  static toastMessage(
    type: ToastType,
    message: string,
    title?: string,
    image?: number,
    imageTint?: string,
    interval?: number
  ): void {
    if (!this.isRecursiveTimeout) {
      if (this.ignoreMessage(message?.replace(/(\[.*\])/g, '')?.trim())) {
        this.toast?.toastWithType({
          type,
          title: title?.replace(/(\[.*\])/g, '')?.trim(),
          message: message?.replace(/(\[.*\])/g, '').trim(),
          image,
          imageTint,
          interval: interval === undefined ? this.DEFAULT_TIMEOUT : interval
        });
      }
    } else {
      this.queue.push({
        type,
        title,
        message,
        image,
        imageTint,
        interval
      });
    }
  }

  /**
   * If the toast is not open, then show the first message in the queue. If the toast is open, then add
   * the message to the queue
   */
  static toastMessages(messages: InternalDataPropsType[]): void {
    if (!this.isRecursiveTimeout) {
      this.queue.push(...messages);
      this.isRecursiveTimeout = true;
      this.toast?.toastLifecycle((isOpen) => {
        if (!isOpen) {
          if (this.queue.length > 0) {
            const firstMessage: InternalDataPropsType | undefined = this.queue.shift();
            if (this.ignoreMessage(firstMessage?.message?.replace(/(\[.*\])/g, '')?.trim())) {
              this.toast?.toastWithType({
                type: firstMessage?.type,
                title: firstMessage?.title?.replace(/(\[.*\])/g, '')?.trim(),
                message: firstMessage?.message?.replace(/(\[.*\])/g, '')?.trim(),
                image: firstMessage?.image,
                imageTint: firstMessage?.imageTint,
                interval:
                  firstMessage?.interval === undefined
                    ? this.DEFAULT_TIMEOUT
                    : firstMessage?.interval
              });
            }
          } else {
            this.isRecursiveTimeout = false;
          }
        }
      });
    } else {
      this.queue.push(...messages);
    }
  }

  /**
   * It closes the toast.
   */
  static closeToast(): void {
    this.toast?.clearToast();
  }
}
