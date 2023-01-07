import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import includes from 'lodash/includes';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useTheme } from 'rn-custom-style-sheet';
import { AppConst, AppRouteEnum, ExcludeTrackAppRoute } from '@constants';
import { useExceptionHandler {% if cookiecutter.state_management != 'graphql' -%}, useGlobalError {% endif -%} } from '@hooks';
import { Colors } from '@themes';
import { getLinkConfiguration, navigationRef, routeNameRef } from '@utils';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import LaunchNavigator from './LaunchNavigator';

/**
 * The type of the navigation prop for the RootStack.
 * @typedef {object} AppNavigatorParams is an object type with keys that are the route names
 * and values that are the route params
 * @property {undefined} [LAUNCH] - The launch stack.
 * @property {undefined} [AUTH] - The auth stack.
 * @property {undefined} [HOME] - The home stack.
 */
export type AppNavigatorParams = {
  [AppRouteEnum.LAUNCH]: undefined;
  [AppRouteEnum.AUTH]: undefined;
  [AppRouteEnum.HOME]: undefined;
};

/**
 * Creating a stack navigator with the type of AppNavigatorParams.
 * @returns {StackNavigator} - The root stack navigator.
 */
const Stack = createStackNavigator<AppNavigatorParams>();

/**
 * Initializes the React Navigation DevTools.
 * @returns None
 */
function InitializeReactNavigationDevTools(): void {
  const { useFlipper, useReduxDevToolsExtension } = require('@react-navigation/devtools');
  useFlipper(navigationRef);
  useReduxDevToolsExtension(navigationRef);
}

/**
 * The main App container.
 * @returns {React.ReactElement} The main App container.
 */
export default function AppNavigator(): React.ReactElement {
  const { theme } = useTheme(() => {});
  useExceptionHandler();
  {% if cookiecutter.state_management != 'graphql' -%}
  useGlobalError();
  {% endif -%}
  {% raw %}

  if (AppConst.isDevelopment) {
    InitializeReactNavigationDevTools();
  }
  
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={getLinkConfiguration()}
      theme={{
        dark: theme === 'dark',
        colors: {
          primary: Colors[theme]?.invertedBlack,
          background: Colors[theme]?.invertedWhite,
          card: Colors[theme]?.invertedWhite,
          text: Colors[theme]?.invertedBlack,
          border: Colors[theme]?.invertedBlack,
          notification: Colors[theme]?.invertedWhite
        }
      }}
      onReady={() => {
        SplashScreen.hide();
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute()?.name;

        if (
          previousRouteName !== currentRouteName &&
          !includes(ExcludeTrackAppRoute, currentRouteName)
        ) {
          // ServiceConst.analyticsService.screenEventSegment(currentRouteName, {});
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator
        initialRouteName={AppRouteEnum.LAUNCH}
        screenOptions={{ headerMode: 'screen', headerShown: false }}
      >
        <Stack.Screen name={AppRouteEnum.LAUNCH} component={LaunchNavigator} />
        <Stack.Screen name={AppRouteEnum.AUTH} component={AuthNavigator} />
        <Stack.Screen name={AppRouteEnum.HOME} component={HomeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
{%- endraw %}
