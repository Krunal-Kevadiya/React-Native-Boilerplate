import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import includes from 'lodash/includes';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';

import { ToastHolder } from '@components';
import { AppConst, AppRouteEnum, ExcludeTrackAppRoute } from '@constants';
import { useDidMount, useExceptionHandler } from '@hooks';
import { ErrorResponse, UserResponse } from '@models';
import { AppRequestSelectors, AuthSelectors, AppRequestActions } from '@stores';
import { getLinkConfiguration } from '@utils';

import AuthNavigator from './AuthNavigators';
import HomeNavigator from './HomeNavigator';
import LaunchNavigator from './LaunchNavigator';
import { navigationRef, rightToLeftAnimation, routeNameRef } from './NavigatorUtil';

import type { AppDispatchType, RootStateType } from '@stores';

export type AppNavigatorParams = {
  [AppRouteEnum.LAUNCH]: undefined;
  [AppRouteEnum.AUTH]: undefined;
  [AppRouteEnum.HOME]: undefined;
};

const Stack = createStackNavigator<AppNavigatorParams>();

function InitializeReactNavigationDevTools(): void {
  const { useFlipper, useReduxDevToolsExtension } = require('@react-navigation/devtools');
  useFlipper(navigationRef);
  useReduxDevToolsExtension(navigationRef);
}

function InitializeApp(): React.ReactElement | null {
  const dispatch = useDispatch<AppDispatchType>();
  const error = useSelector<RootStateType, ErrorResponse>(AppRequestSelectors.getError);

  if (AppConst.isDevelopment) {
    InitializeReactNavigationDevTools();
  }

  useEffect(() => {
    if (error.message && error.isGlobalType) {
      ToastHolder.toastMessage(error.message);
      dispatch(AppRequestActions.changeError(undefined));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error.message, error.isGlobalType]);

  useDidMount(() => {
    dispatch(AppRequestActions.changeError(undefined));
  });

  return null;
}

function InitializeAppWithUser(): React.ReactElement | null {
  useExceptionHandler();
  return null;
}

export default function AppNavigator(): React.ReactElement {
  const user = useSelector<RootStateType, UserResponse>(AuthSelectors.getUser);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={getLinkConfiguration()}
      onReady={() => {
        SplashScreen.hide();
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName && !includes(ExcludeTrackAppRoute, currentRouteName)) {
          //ServiceConst.analyticsService.screenEventSegment(currentRouteName, {});
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
    >
      <InitializeApp />
      {user?.id && <InitializeAppWithUser />}
      <Stack.Navigator
        initialRouteName={AppRouteEnum.LAUNCH}
        screenOptions={{ headerMode: 'screen', headerShown: false, ...rightToLeftAnimation }}
      >
        <Stack.Screen name={AppRouteEnum.LAUNCH} component={LaunchNavigator} />
        <Stack.Screen name={AppRouteEnum.AUTH} component={AuthNavigator} />
        <Stack.Screen name={AppRouteEnum.HOME} component={HomeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
