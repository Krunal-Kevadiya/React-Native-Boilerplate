import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AppRouteEnum } from '@constants';
import { SignInScreen } from '@modules';
import type { AppNavigatorParams } from './AppNavigator';
import { rightToLeftAnimation } from './NavigatorUtil';

export type AuthNavigatorParams = AppNavigatorParams & {
  [AppRouteEnum.SIGN_IN]: undefined;
};

const Stack = createStackNavigator<AuthNavigatorParams>();

export default function AuthNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{ headerMode: 'screen', headerShown: false, ...rightToLeftAnimation }}
      initialRouteName={AppRouteEnum.SIGN_IN}
    >
      <Stack.Screen name={AppRouteEnum.SIGN_IN} component={SignInScreen} />
    </Stack.Navigator>
  );
}
