import { networkSaga } from 'react-native-offline';
import { all, fork } from 'redux-saga/effects';

import { AppConst } from '@constants';

import AuthSaga from './AuthSaga';

import type { ConnectivityArgs } from 'react-native-offline/dist/src/types';

/**
 * The configuration object for the connectivity checker.
 * @property {number} pingTimeout - The timeout for the ping request.
 * @property {string} pingServerUrl - The URL of the ping server.
 * @property {boolean} shouldPing - Whether or not to ping the server.
 * @property {number} pingInterval - The interval between pings.
 * @property {boolean} pingOnlyIfOffline - Whether or not to ping only if offline.
 * @property {boolean} pingInBackground - Whether or not to ping in the background.
 * @property {string} httpMethod - The HTTP method to use for the
 */
const networkConfig: ConnectivityArgs = {
  pingTimeout: 10000,
  pingServerUrl: AppConst.pingServerUrl,
  shouldPing: true,
  pingInterval: 1000,
  pingOnlyIfOffline: true,
  pingInBackground: false,
  httpMethod: 'HEAD'
};

/**
 * The root saga for the application.
 * @returns None
 */
export default function* rootSaga() {
  yield all([fork(networkSaga, networkConfig), ...AuthSaga]);
}
