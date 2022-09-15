import { Alert, BackHandler } from 'react-native';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

import { sentryCaptureException } from '@configs';

export default function useExceptionHandler(): void {
  function reporter(error: Error): void {
    sentryCaptureException(error);
  }

  // This will display only to the dev/QA to detect the error on development version, So, the below string is not part of the application string (Not for the users). Thus, Not added at global Strings.
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

  setJSExceptionHandler(errorHandler, true);

  setNativeExceptionHandler(
    (errorString) => {
      sentryCaptureException(new Error(errorString));
    },
    false,
    true
  );
}
