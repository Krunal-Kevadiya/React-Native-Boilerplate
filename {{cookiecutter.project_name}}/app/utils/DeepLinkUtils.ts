import filter from 'lodash/filter';
import has from 'lodash/has';
import { Linking } from 'react-native';

import { ToastHolder } from '@components';
import { DeepLinkEnum, RegexConst, AppConst, AppRouteEnum } from '@constants';

import { isPresentValue } from './StringUtils';

import type { LinkingOptions } from '@react-navigation/native';

/**
 * Determines if the given route name and params are a toast message.
 * @param {DeepLinkEnum} routeName - the route name of the deep link
 * @param {Record<string, any>} params - the params of the deep link
 * @returns {boolean} - true if the route name and params are a toast message, false otherwise
 */
function isToastMessage(/*routeName: DeepLinkEnum, params: Record<string, any>*/): boolean {
  // const isMeeting = routeName === DeepLinkEnum.MEETING && params;
  // const isSignInWithEmailLink = routeName === DeepLinkEnum.SIGN_IN_WITH_EMAIL_LINK;
  // return !isMeeting && !isSignInWithEmailLink;
  return true;
}

/**
 * Checks if the given route name and params are a deep link type.
 * @param {DeepLinkEnum} routeName - the route name to check
 * @param {Record<string, any>} params - the params to check
 * @param {DeepLinkEnum} type - the deep link type to check
 * @param {boolean} [onlyToast=false] - if true, only check if the route is a toast message
 * @returns {boolean} - true if the route is a deep link type
 */
function isDeepLinkType(
  routeName: DeepLinkEnum,
  params: Record<string, any>,
  type: DeepLinkEnum,
  onlyToast: boolean = false
): boolean {
  if (onlyToast) {
    return isToastMessage(/*routeName, params*/);
  }
  const isMatchRoute = routeName === type;
  const isMatchParams = has(params, type);
  return isMatchRoute || isMatchParams;
}

/**
 * Takes in a URL and converts it to a deep link.
 * @param {string} url - the URL to convert
 * @param {DeepLinkEnum} routeName - the route name of the deep link
 * @param {string | undefined} id - the id of the deep link
 * @param {Record<string, any>} params - the params of the deep link
 * @returns {string | undefined} the deep link URL
 */
function convertUrlToDeepLink(
  url: string/*,
  routeName: DeepLinkEnum,
  id: string | undefined,
  params: Record<string, any>*/
): string | undefined {
  // if (isDeepLinkType(routeName, params, DeepLinkEnum.MEETING)) {
  //   return `${AppConst.deepLinkPrefixes[0]}home/meetingDetails/${id}`;
  // } else if (isDeepLinkType(routeName, params, DeepLinkEnum.SIGN_IN_WITH_EMAIL_LINK)) {
  //   return `${AppConst.deepLinkPrefixes[0]}launch/welcome/${routeName}`;
  // }
  return url;
}

/**
 * Checks the given URL and returns the route name, id, params, and deep link.
 * @param {string} url - the URL to check.
 * @returns {CheckAndGetParamsReturnType} - the route name, id, params, and deep link.
 */
type CheckAndGetParamsReturnType = {
  routeName: DeepLinkEnum;
  id: string | undefined;
  params: Record<string, any>;
  deepLink: string | undefined;
  url: string;
};

/**
 * Checks if the url is a deep link and returns the route name, id, params, deep link, and url.
 * @param {string} url - the url to check
 * @returns {CheckAndGetParamsReturnType | undefined} - the route name, id, params, deep link, and url.
 */
function checkAndGetParams(url: string): CheckAndGetParamsReturnType | undefined {
  // if the url has no params, return just open the app
  if (filter(AppConst.deepLinkPrefixes, (domain: string) => url === domain).length > 0) {
    return undefined;
  }

  // try {
  const route: string = url?.replace(RegexConst.routeReplace, '')?.replace(RegexConst.deepLinkQueryParamsMatch, '');
  const result: RegExpMatchArray | null = route?.match(RegexConst.paramReplace);
  const id: string | undefined =
    isPresentValue(result) && (result?.length ?? 0) >= 2 ? result?.[1] ?? undefined : undefined;
  let params = {};
  if (RegexConst.deepLinkQueryParamsMatch.test(url)) {
    params =
      url
        ?.match(RegexConst.deepLinkQueryParamsMatch)?.[1]
        ?.split('&')
        ?.reduce((acc, param) => {
          const [key, value] = param.split('=');
          return { ...acc, [key]: value };
        }, {}) ?? {};
  }
  const routeNameIndex: number = url === AppConst.deepLinkPrefixes[0] ? 0 : 1;
  const routeName: DeepLinkEnum = route.split('/')[routeNameIndex] as DeepLinkEnum;
  const deepLink: string | undefined = convertUrlToDeepLink(url/*, routeName, id, params*/);
  return { routeName, id, params, deepLink, url };
}

/**
 * Takes in a url and returns the deep link if it is a deep link.
 * @param {string} url - the url to check for a deep link
 * @returns {string} the deep link if it is a deep link, otherwise an empty string
 */
function handleUrlLink(url: string): string {
  const details: CheckAndGetParamsReturnType | undefined = checkAndGetParams(url);
  if (details !== undefined) {
    const isLocalToastMessage: boolean = isDeepLinkType(
      details.routeName,
      details.params,
      DeepLinkEnum.TOAST_MESSAGE,
      true
    );
    if (
      isDeepLinkType(details.routeName, details.params, DeepLinkEnum.TOAST_MESSAGE) &&
      isPresentValue(details.params.toastMessage)
    ) {
      ToastHolder.toastMessage(decodeURIComponent(details.params.toastMessage));
    }

    if (!isLocalToastMessage) {
      return details.deepLink ?? '';
    }
  }
  return '';
}

/**
 * It returns a linking configuration object that enables deep linking in the app
 */
export function getLinkConfiguration(): LinkingOptions<Object> {
  const linking = {
    enabled: true,

    prefixes: AppConst.deepLinkPrefixes,

    /**
     * Custom function to get the URL which was used to open the app
     * A function that returns a promise that resolves to a string.
     */
    async getInitialURL() {
      // As a fallback, you may want to do the default deep link handling
      const url = await Linking.getInitialURL();
      return url ? handleUrlLink(url) : url;
    },

    subscribe: (listener: (url: string) => void) => {
      /**
       * It takes an object with a url property and returns a function that takes a listener function
       * as an argument.
       * @param  - `url` - The URL that was received.
       */
      const onReceiveURL = ({ url }: { url: string }) => {
        listener(handleUrlLink(url));
      };

      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);
      return () => {
        // Clean up the event listeners
        linkingSubscription.remove();
      };
    },

    config: {
      // Deep link configuration
      screens: {
        [AppRouteEnum.LAUNCH]: {
          path: 'launch',
          initialRouteName: AppRouteEnum.WEL_COME,
          screens: {
            [AppRouteEnum.WEL_COME]: 'welcome/:routeName?'
          }
        }/*,
        [AppRouteEnum.AUTH]: {
          path: 'auth',
          initialRouteName: AppRouteEnum.SIGN_IN
        }*/
      }
    }
  };
  return linking as LinkingOptions<Object>;
}
