import { SENTRY_URL, SEGMENT_KEY, API_URL, ENVIRONMENT } from 'react-native-dotenv';

const appVersion = 'v2.0(1)';
const PREFIXES: string[] = ['reactNativeStructure://', 'beta.reactNativeStructure.com//'];

const AppConst = Object.freeze({
  mobile: 'Mobile',
  isDevelopment: ENVIRONMENT === 'Dev',
  environment: ENVIRONMENT,
  sentryUrl: SENTRY_URL,
  segmentKey: SEGMENT_KEY,
  apiUrl: API_URL,
  appVersion,
  deepLinkPrefixes: PREFIXES,
  pingServerUrl: 'https://www.google.com/'
});
export default AppConst;
