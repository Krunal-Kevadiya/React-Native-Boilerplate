import { SENTRY_URL, API_URL, ENVIRONMENT, ENCRYPTION_KEY } from 'react-native-dotenv';

const appVersion = 'v1.0(1)';
const PREFIXES: string[] = ['{{cookiecutter.deep_link_scheme}}://', '{{cookiecutter.deep_link_host}}//'];

/**
 * A constant freezing object that contains the app value.
 * @type {Object}
 */
export default Object.freeze({
  mobile: 'Mobile',
  isDevelopment: ENVIRONMENT === 'dev',
  environment: ENVIRONMENT,
  sentryUrl: SENTRY_URL,
  encryptionKey: ENCRYPTION_KEY,
  apiUrl: API_URL,
  appVersion,
  deepLinkPrefixes: PREFIXES,
  pingServerUrl: 'https://www.google.com/'
});
