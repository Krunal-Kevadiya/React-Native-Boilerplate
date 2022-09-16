import { apiConfig } from '@configs';
import { AppConst } from '@constants';

import AuthService from './AuthService';

import type { ApisauceInstance } from 'apisauce';

export type { AuthServiceType } from './AuthService';

/**
 * Use AuthorizedAPI when Authorization token required for the API request
 * Use UnauthorizedAPI when Authorization token NOT required for the API request
 */
const authorizedAPI: ApisauceInstance = apiConfig(AppConst.apiUrl);
//const unauthorizedAPI: ApisauceInstance = apiConfig(AppConst.apiUrl);

export function setAuthorizedApiHeader(token: string = ''): void {
  authorizedAPI.setHeader('authorization', token);
}

export default {
  authApi: AuthService(authorizedAPI)
};
