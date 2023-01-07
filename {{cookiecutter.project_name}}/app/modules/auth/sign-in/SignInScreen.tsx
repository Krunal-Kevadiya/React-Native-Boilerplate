import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { Icons } from '@assets';
import { Header, Icon } from '@components';
import { navigateBack } from '@utils';
import { SignInForm } from './sign-in-form';
import styleSheet from './SignInStyles';
import useSignIn from './useSignIn';
import type { SignInHookReturnType } from './SignInTypes';
import type { XmlProps } from 'react-native-svg';

/**
 * The SignInScreen component.
 * @returns {React.ReactElement} A React Element.
 */
export default function SignInScreen(): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const formik: SignInHookReturnType = useSignIn();

  return (
    <View style={StyleSheet.flatten([styles.screen, styles.screenView])}>
      <Header
        isBottomLine={false}
        left={{
          type: 'svg',
          source: Icons.icArrowLeft,
          svgStyle: styles.headerLeftImage as XmlProps,
          onPress: () => navigateBack()
        }}
      />
      <View style={StyleSheet.flatten([styles.screen, styles.centerAlign])}>
        <Icon
          type="svg"
          style={styles.logo}
          svgStyle={styles.logoSvg as XmlProps}
          source={Icons.icLogo}
        />
        <SignInForm {...formik} />
      </View>
    </View>
  );
}
