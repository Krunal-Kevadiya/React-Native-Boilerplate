import { SENTRY_URL, API_URL, ENVIRONMENT, ENCRYPTION_KEY } from 'react-native-dotenv';

const appVersion: string = 'v1.0(1)';

/**
 * A constant freezing object that contains the app value.
 * @type {Object}
 */
export default Object.freeze({
  mobile: 'Mobile',
  isDevelopment: __DEV__ || ENVIRONMENT === 'dev',
  environment: ENVIRONMENT,
  sentryUrl: SENTRY_URL,
  encryptionKey: ENCRYPTION_KEY,
  apiUrl: API_URL,
  appVersion,
  pingServerUrl: 'https://www.google.com/'
});
