import Config from 'react-native-config';

const appVersion: string = 'v1.0(1)';

/**
 * A constant freezing object that contains the app value.
 * @type {Object}
 */
export default Object.freeze({
  mobile: 'Mobile',
  isDevelopment: __DEV__ || Config.ENVIRONMENT === 'dev',
  environment: Config.ENVIRONMENT,
  sentryUrl: Config.SENTRY_URL,
  encryptionKey: Config.ENCRYPTION_KEY,
  apiUrl: Config.API_URL,
  appVersion,
  pingServerUrl: 'https://www.google.com/'
});
