import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AppRouteEnum } from '@constants';
import { SignInScreen } from '@modules';
import { rightToLeftAnimation } from './NavigatorUtil';

/**
 * The type of the navigation prop for the RootStack.
 * @typedef {object} HomeNavigatorParams is an object type with keys that are the route names
 * and values that are the route params
 * @property {undefined} [SIGN_IN] - The sign in screen.
 */
export type HomeNavigatorParams = {
  [AppRouteEnum.SIGN_IN]: undefined;
};

/**
 * Creating a stack navigator with the type of HomeNavigatorParams.
 * @returns {StackNavigator} - The root stack navigator.
 */
const Stack = createStackNavigator<HomeNavigatorParams>();

/**
 * The home App container.
 * @returns {React.ReactElement} The home App container.
 */
export default function HomeNavigator(): React.ReactElement {
  return (
    <Stack.Navigator screenOptions={{ headerMode: 'screen', headerShown: false, ...rightToLeftAnimation }}>
      <Stack.Screen name={AppRouteEnum.SIGN_IN} component={SignInScreen} />
    </Stack.Navigator>
  );
}
