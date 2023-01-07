import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AppRouteEnum } from '@constants';
import { SignInScreen } from '@modules';
import type { AppNavigatorParams } from './AppNavigator';

/**
 * The type of the navigation prop for the RootStack.
 * @typedef {object} AuthNavigatorParams is an object type with keys that are the route names
 * and values that are the route params
 * @property {undefined} [SIGN_IN] - The sign in screen.
 */
export type AuthNavigatorParams = AppNavigatorParams & {
  [AppRouteEnum.SIGN_IN]: undefined;
};

/**
 * Creating a stack navigator with the type of AuthNavigatorParams.
 * @returns {StackNavigator} - The root stack navigator.
 */
const Stack = createStackNavigator<AuthNavigatorParams>();

/**
 * The auth App container.
 * @returns {React.ReactElement} The auth App container.
 */
export default function AuthNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{ headerMode: 'screen', headerShown: false }}
      initialRouteName={AppRouteEnum.SIGN_IN}
    >
      <Stack.Screen name={AppRouteEnum.SIGN_IN} component={SignInScreen} />
    </Stack.Navigator>
  );
}
