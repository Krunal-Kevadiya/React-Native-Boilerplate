import filter from 'lodash/filter';
import has from 'lodash/has';
import { sentryCaptureException } from '@configs';
import { DeepLinkEnum, deepLinkPrefixes, RegexConst } from '@constants';
import { isPresentValue } from './StringUtils';

/**
 * Determines if the given route name and params are a toast message.
 * @param {DeepLinkEnum} routeName - the route name of the deep link
 * @param {Record<string, any>} params - the params of the deep link
 * @returns {boolean} - true if the route name and params are a toast message, false otherwise
 */
function isToastMessage(
  routeName: DeepLinkEnum | undefined,
  _params: Record<string, any>
): boolean {
  const isMagicLink: boolean = routeName === DeepLinkEnum.MagicLink;
  const isForgotPassword: boolean = routeName === DeepLinkEnum.ForgotPassword;
  return !isMagicLink && !isForgotPassword;
}

/**
 * Checks if the given route name and params are a deep link type.
 * @param {DeepLinkEnum} routeName - the route name to check
 * @param {Record<string, any>} params - the params to check
 * @param {DeepLinkEnum} type - the deep link type to check
 * @param {boolean} [onlyToast=false] - if true, only check if the route is a toast message
 * @returns {boolean} - true if the route is a deep link type
 */
export function isDeepLinkType(
  routeName: DeepLinkEnum | undefined,
  params: Record<string, any>,
  type: DeepLinkEnum,
  onlyToast: boolean = false
): boolean {
  if (onlyToast) {
    return isToastMessage(routeName, params);
  }
  const isMatchRoute: boolean = routeName === type;
  const isMatchParams: boolean = has(params, type);
  return isMatchRoute || isMatchParams;
}

/**
 * Takes in a URL and converts it to a deep link.
 * @param {string} url - the URL to convert
 * @param {DeepLinkEnum} routeName - the route name of the deep link
 * @param {Record<string, any>} params - the params of the deep link
 * @returns {string | undefined} the deep link URL
 */
function convertUrlToDeepLink(
  url: string,
  routeName: DeepLinkEnum,
  params: Record<string, any>
): string | undefined {
  if (isDeepLinkType(routeName, params, DeepLinkEnum.MagicLink)) {
    return `${deepLinkPrefixes[0]}auth/signIn/${encodeURIComponent(url)}/${params?.tenantId}/${
      params?.email
    }`;
  } else if (isDeepLinkType(routeName, params, DeepLinkEnum.ForgotPassword)) {
    return `${deepLinkPrefixes[0]}auth/createNewPassword/${params?.oobCode}/${params?.tenantId}/${params?.email}`;
  }
  return undefined;
}

/**
 * Checks the given URL and returns the route name, id, params, and deep link.
 * @param {string} branchUrl - the URL to check.
 * @returns {CheckAndGetParamsReturnType} - the route name, id, params, and deep link.
 */
export type CheckAndGetParamsReturnType = {
  routeName?: DeepLinkEnum;
  params: Record<string, any>;
  deepLink?: string;
  branchUrl: string;
};

/**
 * It takes a URL and returns an object with the URL's parameters as key-value pairs
 * @returns An object with the key value pairs of the url parameters.
 */
function getUrlParams(branchUrl: string): Record<string, string> {
  let newParams: Record<string, string> = {};
  try {
    let params: Record<string, string> = {};
    let regex: RegExp = RegexConst.deepLinkQueryParamsMatch;
    let match;
    while ((match = regex.exec(branchUrl))) {
      params[match[1]] = decodeURIComponent(match[2]);
    }
    let keyIndex: number = 0;
    const keyList: string[] = Object.keys(params);
    while (keyIndex < keyList.length) {
      const keyName: string = keyList[keyIndex];
      const keyValue: string = params[keyName];

      let match1;
      while ((match1 = regex.exec(keyValue))) {
        newParams[match1[1]] = match1[2];
      }
      newParams[keyName] = params[keyName];
      keyIndex++;
    }
  } catch (e) {}
  return newParams;
}

/**
 * It takes a url, parses it, and returns an object with the route name, id, and params
 * @param {string} nonBranchUrl - The url that was passed to the app.
 * @returns An object with the following properties:
 * routeName: DeepLink
 * params: Record<string, any>
 * deepLink: string
 * branchUrl: string
 */
export function checkAndGetParams(nonBranchUrl: string): CheckAndGetParamsReturnType | undefined {
  const branchUrl: string = decodeURIComponent(nonBranchUrl);
  // if the url has no params, return just open the app
  if (filter(deepLinkPrefixes, (domain: string) => branchUrl === domain).length > 0)
    return undefined;

  try {
    const newParams: Record<string, string> = getUrlParams(branchUrl);

    let routeName: DeepLinkEnum = DeepLinkEnum.ToastMessage;
    // if there is a url in params save it for later
    if (newParams.continueUrl && isPresentValue(newParams.continueUrl)) {
      const routeArray: string[] = newParams.continueUrl
        .substring(0, newParams.continueUrl.indexOf('?'))
        .split('/');
      routeName = routeArray[routeArray.length - 1] as DeepLinkEnum;
    }
    const deepLink: string | undefined = convertUrlToDeepLink(nonBranchUrl, routeName, newParams);
    return { routeName, params: newParams, deepLink, branchUrl };
  } catch (error: any) {
    sentryCaptureException(error);
  }
  return undefined;
}
