import { Alert, BackHandler } from 'react-native';
import ExceptionHandler from 'react-native-exception-handler';
import { sentryCaptureException } from '@configs';

/**
 * It sets the global JS exception handler to the given function, and sets the native exception handler
 * to capture exceptions in Sentry
 */
export default function useExceptionHandler(): void {
  /**
   * A function that sends an error to Sentry.
   * @param {Error} error - The error to send to Sentry.
   * @returns None
   */
  function reporter(error: Error): void {
    sentryCaptureException(error);
  }

  /**
   * Handles errors and alerts the user if they are fatal.
   * This will display only to the dev/QA to detect the error on development version, So, the below string is
   * not part of the application string (Not for the users). Thus, Not added at global Strings.
   * @param {Error} error - the error to handle
   * @param {boolean} [isFatal=false] - whether the error is fatal
   * @returns None
   */
  function errorHandler(error: Error, isFatal: boolean): void {
    if (isFatal) {
      reporter(error);
      Alert.alert(
        'Unexpected error occurred',
        `
        Error: ${isFatal ? 'Fatal:' : ''} ${error.name} ${error.message}
        We have reported this to our team ! Please close the app and start again!
        `,
        [
          {
            text: 'Close',
            onPress: () => {
              BackHandler.exitApp();
            }
          }
        ]
      );
    }
  }

  /**
   * Sets the global JS exception handler to the given function.
   * @param {Function} errorHandler - the function to handle the error.
   * @param {boolean} [isAsync=false] - whether the error handler is asynchronous.
   * @returns None
   */
  ExceptionHandler.setJSExceptionHandler(errorHandler, true);

  /**
   * Sets the native exception handler to capture exceptions in Sentry.
   * @param {Function} callback - the callback to call when an exception is thrown.
   * @param {boolean} [captureUncaught=true] - whether to capture uncaught exceptions.
   * @param {boolean} [captureUnhandledRejections=true] - whether to capture unhandled rejections.
   * @returns None
   */
  ExceptionHandler.setNativeExceptionHandler(
    (errorString: string) => {
      sentryCaptureException(new Error(errorString));
    },
    false,
    true
  );
}
