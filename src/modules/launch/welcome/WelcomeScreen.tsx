import { type RouteProp, useRoute } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { AppRouteEnum } from '@constants';
import { navigateWithReset } from '@navigators';
import { Colors } from '@themes';
import { isPresentValue } from '@utils';
import type { WelcomeRouteParamList } from './WelcomeType';
import styleSheet from './WelcomeStyle';

export default function WelcomeScreen(): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const route = useRoute<RouteProp<WelcomeRouteParamList, 'Welcome'>>();

  useEffect(() => {
    if (isPresentValue(route.params?.routeName)) {
      navigateWithReset(AppRouteEnum.HOME, AppRouteEnum.SIGN_IN);
    } else {
      navigateWithReset(AppRouteEnum.AUTH, AppRouteEnum.SIGN_IN);
    }
  }, [route.params?.routeName]);

  return (
    <View style={StyleSheet.flatten([styles.screen, styles.centerAlign, styles.screenView])}>
      <ActivityIndicator size="large" color={Colors.secondary} />
    </View>
  );
}
