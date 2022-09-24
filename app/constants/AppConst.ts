import { SENTRY_URL, SEGMENT_KEY, API_URL, ENVIRONMENT, ENCRYPTION_KEY } from 'react-native-dotenv';

const appVersion = 'v1.0(1)';
const PREFIXES: string[] = ['reactNativeBoilerplate://', 'beta.reactNativeBoilerplate.com//'];

/**
 * A constant freezing object that contains the app value.
 * @type {Object}
 */
export default Object.freeze({
  mobile: 'Mobile',
  isDevelopment: ENVIRONMENT === 'Dev',
  environment: ENVIRONMENT,
  sentryUrl: SENTRY_URL,
  encryptionKey: ENCRYPTION_KEY,
  segmentKey: SEGMENT_KEY,
  apiUrl: API_URL,
  appVersion,
  deepLinkPrefixes: PREFIXES,
  pingServerUrl: 'https://www.google.com/'
});
