import { Formik, FormikProps } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { XmlProps } from 'react-native-svg';
import { useTheme } from 'rn-custom-style-sheet';
import { Icons } from '@assets';
import { Header, Icon } from '@components';
import { SignInFormModel, SignInFormSchema } from '@models';
import { navigateBack } from '@navigators';
import type { UseSignInReturnType } from './SignIn.type';
import useSignIn from './SignIn.hook';
import styleSheet from './SignIn.style';
import SignInForm from './SignInForm/SignInForm';

export default function SignInScreen(): React.ReactElement {
  const styles = useTheme(styleSheet);
  const { refSignIn, onFormSubmit }: UseSignInReturnType = useSignIn();

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
        <Icon type="svg" style={styles.logo} svgStyle={styles.logoSvg as XmlProps} source={Icons.icLogo} />
        <Formik
          innerRef={refSignIn}
          validateOnChange={false}
          validateOnBlur={false}
          validateOnMount={false}
          initialValues={SignInFormModel.empty()}
          validationSchema={SignInFormSchema}
          onSubmit={onFormSubmit}
        >
          {(props: FormikProps<SignInFormModel>) => <SignInForm {...props} />}
        </Formik>
      </View>
    </View>
  );
}
