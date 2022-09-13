import { networkSaga } from 'react-native-offline';
import { all, fork } from 'redux-saga/effects';
import { AppConst } from '@constants';
import type { ConnectivityArgs } from 'react-native-offline/dist/src/types';
import AuthSaga from './AuthSaga';

const networkConfig: ConnectivityArgs = {
  pingTimeout: 10000,
  pingServerUrl: AppConst.pingServerUrl,
  shouldPing: true,
  pingInterval: 1000,
  pingOnlyIfOffline: true,
  pingInBackground: false,
  httpMethod: 'HEAD'
};

export default function* rootSaga() {
  yield all([fork(networkSaga, networkConfig), ...AuthSaga]);
}
