import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AppRouteEnum } from '@constants';
import { SignInScreen } from '@modules';
import { rightToLeftAnimation } from './NavigatorUtil';

export type HomeNavigatorParams = {
  [AppRouteEnum.SIGN_IN]: undefined;
};

const Stack = createStackNavigator<HomeNavigatorParams>();

export default function HomeNavigator(): React.ReactElement {
  return (
    <Stack.Navigator screenOptions={{ headerMode: 'screen', headerShown: false, ...rightToLeftAnimation }}>
      <Stack.Screen name={AppRouteEnum.SIGN_IN} component={SignInScreen} />
    </Stack.Navigator>
  );
}
