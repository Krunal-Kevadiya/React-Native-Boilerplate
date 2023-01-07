import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AppRouteEnum } from '@constants';
import { WelcomeScreen } from '@modules';
import type { AppNavigatorParams } from './AppNavigator';

/**
 * The type of the navigation prop for the RootStack.
 * @typedef {object} LaunchNavigatorParams is an object type with keys that are the route names
 * and values that are the route params
 * @property {undefined} [WEL_COME] - The welcome screen.
 */
type LaunchNavigatorParams = AppNavigatorParams & {
  [AppRouteEnum.WEL_COME]: undefined;
};

/**
 * Creating a stack navigator with the type of LaunchNavigatorParams.
 * @returns {StackNavigator} - The root stack navigator.
 */
const Stack = createStackNavigator<LaunchNavigatorParams>();

/**
 * The launch App container.
 * @returns {React.ReactElement} The launch App container.
 */
export default function LaunchNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{ headerMode: 'screen', headerShown: false }}
      initialRouteName={AppRouteEnum.WEL_COME}
    >
      <Stack.Screen name={AppRouteEnum.WEL_COME} component={WelcomeScreen} />
    </Stack.Navigator>
  );
}
