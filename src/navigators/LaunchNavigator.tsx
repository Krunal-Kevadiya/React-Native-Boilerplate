import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AppRouteEnum } from '@constants';
import { WelcomeScreen } from '@modules';
import type { AppNavigatorParams } from './AppNavigator';
import { rightToLeftAnimation } from './NavigatorUtil';

type LaunchNavigatorParams = AppNavigatorParams & {
  [AppRouteEnum.WEL_COME]: undefined;
};

const Stack = createStackNavigator<LaunchNavigatorParams>();

export default function LaunchNavigator(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{ headerMode: 'screen', headerShown: false, ...rightToLeftAnimation }}
      initialRouteName={AppRouteEnum.WEL_COME}
    >
      <Stack.Screen name={AppRouteEnum.WEL_COME} component={WelcomeScreen} />
    </Stack.Navigator>
  );
}
