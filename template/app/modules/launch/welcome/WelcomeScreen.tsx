import { type RouteProp, useRoute } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { AppRouteEnum } from '@constants';
import { Colors } from '@themes';
import { navigateWithReset, isPresentValue } from '@utils';
import styleSheet from './WelcomeStyles';
import type { WelcomeRouteParamList } from './WelcomeTypes';

/**
 * The welcome screen.
 * @returns {React.ReactElement} A React Element.
 */
export default function WelcomeScreen(): React.ReactElement {
  const { styles, themeMode } = useTheme(styleSheet);
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
      <ActivityIndicator size="large" color={Colors[themeMode]?.secondary} />
    </View>
  );
}
