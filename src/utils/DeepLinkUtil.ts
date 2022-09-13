import filter from 'lodash/filter';
import has from 'lodash/has';
import { Linking } from 'react-native';
import { ToastHolder } from '@components';
import { DeepLinkEnum, RegexConst, AppConst, AppRouteEnum } from '@constants';
import type { LinkingOptions } from '@react-navigation/native';
import { isPresentValue } from './StringUtil';

function isToastMessage(routeName: DeepLinkEnum, params: Record<string, any>): boolean {
  const isMeeting = routeName === DeepLinkEnum.MEETING && params;
  const isSignInWithEmailLink = routeName === DeepLinkEnum.SIGN_IN_WITH_EMAIL_LINK;
  return !isMeeting && !isSignInWithEmailLink;
}

function isDeepLinkType(
  routeName: DeepLinkEnum,
  params: Record<string, any>,
  type: DeepLinkEnum,
  onlyToast: boolean = false
): boolean {
  if (onlyToast) {
    return isToastMessage(routeName, params);
  }
  const isMatchRoute = routeName === type;
  const isMatchParams = has(params, type);
  return isMatchRoute || isMatchParams;
}

function convertUrlToDeepLink(
  url: string,
  routeName: DeepLinkEnum,
  id: string | undefined,
  params: Record<string, any>
): string | undefined {
  if (isDeepLinkType(routeName, params, DeepLinkEnum.MEETING)) {
    return `reactNativeStructure://home/meetingDetails/${id}`;
  } else if (isDeepLinkType(routeName, params, DeepLinkEnum.SIGN_IN_WITH_EMAIL_LINK)) {
    return `reactNativeStructure://launch/welcome/${routeName}`;
  }
  return url;
}

type CheckAndGetParamsReturnType = {
  routeName: DeepLinkEnum;
  id: string | undefined;
  params: Record<string, any>;
  deepLink: string | undefined;
  url: string;
};

function checkAndGetParams(url: string): CheckAndGetParamsReturnType | undefined {
  // if the url has no params, return just open the app
  if (filter(AppConst.deepLinkPrefixes, (domain) => url === domain).length > 0) {
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
  const routeNameIndex: number = url === 'reactNativeStructure://' ? 0 : 1;
  const routeName: DeepLinkEnum = route.split('/')[routeNameIndex] as DeepLinkEnum;
  const deepLink: string | undefined = convertUrlToDeepLink(url, routeName, id, params);
  return { routeName, id, params, deepLink, url };
}

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

export function getLinkConfiguration(): LinkingOptions<Object> {
  const linking = {
    enabled: true,

    prefixes: AppConst.deepLinkPrefixes,

    // Custom function to get the URL which was used to open the app
    async getInitialURL() {
      // As a fallback, you may want to do the default deep link handling
      const url = await Linking.getInitialURL();
      return url ? handleUrlLink(url) : url;
    },

    subscribe: (listener: (url: string) => void) => {
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
        },
        [AppRouteEnum.HOME]: {
          path: 'home',
          initialRouteName: AppRouteEnum.SIGN_IN
        }
      }
    }
  };
  return linking as LinkingOptions<Object>;
}
