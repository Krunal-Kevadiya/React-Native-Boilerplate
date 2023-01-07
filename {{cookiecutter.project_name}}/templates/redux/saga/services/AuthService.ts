import { apiWithCancelToken } from '@configs';
import { APIConst } from '@constants';
import { SignInRequest, UserResponse, ErrorResponse } from '@models';
import type { ApiResponse, ApisauceInstance } from 'apisauce';

export type AuthServiceType = {
  signIn: (credentials: SignInRequest) => Promise<ApiResponse<UserResponse, ErrorResponse>>;
};

/**
 * Creates an AuthServiceType object that can be used to auth module API.
 * @param {Api} api - The Api object to use for the API calls.
 * @returns {AuthServiceType} - An object that can be used to auth module API.
 */
const authService = (api: ApisauceInstance) => (): AuthServiceType => {
  /**
   * Signs in the user with the given credentials.
   * @param {SignInRequest} credentials - The credentials to sign in with.
   * @returns {Promise<ApiResponse<UserResponse>>} - The response from the server.
   */
  function signIn(credentials: SignInRequest): Promise<ApiResponse<UserResponse, ErrorResponse>> {
    return apiWithCancelToken<UserResponse>(api, 'POST', APIConst.signIn, {
      params: credentials.plainRequest
    });
  }

  return {
    signIn
  };
};

export default authService;
