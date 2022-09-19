import { apiConfig } from '@configs';
import { AppConst } from '@constants';

import AuthService from './AuthService';

import type { ApiResponse, ApisauceInstance } from 'apisauce';

export type { AuthServiceType } from './AuthService';

/**
 * Use AuthorizedAPI when Authorization token required for the API request
 * Use UnauthorizedAPI when Authorization token NOT required for the API request
 */
const authorizedAPI: ApisauceInstance = apiConfig(AppConst.apiUrl);
const unauthorizedAPI: ApisauceInstance = apiConfig(AppConst.apiUrl);

/**
 * Set the headers for the authorized API.
 * @param {Record<string, any>} headers - the headers to set for the authorized API.
 * @returns None
 */
export function setHeaders(headers: Record<string, any>): void {
  authorizedAPI.setHeaders(headers);
}

/**
 * Adds an async request transform to the authorized API.
 * @param {Function} transform - the transform to add to the authorized API.
 * @returns None
 */
authorizedAPI.addAsyncRequestTransform(async (request) => {
  console.error({ request });

  // TODO: You can add authorization token like below
  // const state = reduxStore?.store?.getState();
  // const authToken = state?.auth?.loginData?.access_token;
  // const token = `Bearer ${authToken}`;
  // request.headers.Authorization = token;
});

/**
 * Monitor/Logs the response from an API call.
 * @param {ApiResponse<any>} response - the response from the API call.
 * @returns None
 */
function APIMonitor(response: ApiResponse<any>) {
  console.error({ response });

  // console.info(`API MONITOR: ${response?.config?.url}`, response);
}
authorizedAPI.addMonitor(APIMonitor);
unauthorizedAPI.addMonitor(APIMonitor);

/**
 * Takes in an API response and transforms it into a usable format.
 * It will clear the async storage and redirect to the welcome screen if the response status is 401
 * @param {ApiResponse<any>} response - the API response to transform
 * @returns None
 */
async function asyncResponseTransform(response: ApiResponse<any>) {
  console.error({ response });

  // TODO: You can add global condition for token expired or internet issue like below
  // if (response.status === 401) {
  //   AsyncStorage.clear();
  //   reset({ index: 0, routes: [{ name: 'WelcomeScreen' }] });
  // } else if (['TIMEOUT_ERROR', 'CONNECTION_ERROR', 'CANCEL_ERROR'].includes(response.problem ?? '')) {
  //   showToast('Please check your internet connectivity.', 'error');
  // }
}
authorizedAPI.addAsyncResponseTransform(asyncResponseTransform);
unauthorizedAPI.addAsyncResponseTransform(asyncResponseTransform);

export default {
  authApi: AuthService(authorizedAPI)
};
