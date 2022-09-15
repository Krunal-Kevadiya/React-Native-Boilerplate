import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import SpinnerButton from 'react-native-spinner-button';
import { useSelector } from 'react-redux';
import { useTheme } from 'rn-custom-style-sheet';

import { FormInput } from '@components';
import { StringConst } from '@constants';
import { AppRequestSelectors } from '@stores';
import { Colors } from '@themes';

import { isRemainingToFillForm } from '../SignInUtil';

import styleSheet from './SignInFormStyle';

import type { SignInFormPropsType } from './SignInFormTypes';
import type { RootStateType } from '@stores';

export default function SignInForm(props: SignInFormPropsType): React.ReactElement {
  const { styles, theme } = useTheme(styleSheet);
  const inputPasswordRef: React.LegacyRef<TextInput> = React.createRef();
  const loading: boolean = useSelector<RootStateType, boolean>(AppRequestSelectors.getLoading);
  const { handleSubmit, values, errors } = props;
  const disabled: boolean = isRemainingToFillForm(values, errors);

  return (
    <View style={styles.formContainer}>
      <FormInput
        autoFocus
        id="email"
        returnKeyType="next"
        label={StringConst.signIn.textEmail}
        placeholder={StringConst.signIn.inputEmail}
        placeholderTextColor={Colors[theme]?.gray}
        keyboardType="email-address"
        selectionColor={Colors[theme]?.secondary}
        style={styles.textInput}
        containerStyle={styles.textInputContainer}
        errorColor={Colors[theme]?.error}
        {...props}
        onSubmitEditing={() => {
          inputPasswordRef.current?.focus();
        }}
      />
      <FormInput
        secureTextEntry
        id="password"
        ref={inputPasswordRef}
        returnKeyType="done"
        label={StringConst.signIn.textPassword}
        placeholder={StringConst.signIn.inputPassword}
        placeholderTextColor={Colors[theme]?.gray}
        selectionColor={Colors[theme]?.secondary}
        style={styles.textInput}
        containerStyle={styles.textInputContainer}
        errorColor={Colors[theme]?.error}
        {...props}
        onSubmitEditing={handleSubmit}
      />
      <FormInput
        isTagInput
        id="Tag"
        editable={false}
        style={StyleSheet.flatten([styles.textInput, styles.textSignInDesc])}
        inputContainerStyle={styles.signUpDescContainer}
        value={StringConst.signIn.textSignInDesc}
      />
      <SpinnerButton
        buttonContainer={StyleSheet.flatten([styles.buttonContainer, styles.buttonTopMargin])}
        buttonStyle={StyleSheet.flatten([styles.spinnerButton, styles.button])}
        disableStyle={styles.disabledButton}
        animatedDuration={150}
        spinnerType="UIActivityIndicator"
        spinnerColor={Colors[theme]?.secondary}
        disabled={disabled}
        isLoading={loading}
        onPress={handleSubmit}
      >
        <Text style={StyleSheet.flatten([styles.textLabel, styles.buttonText])}>{StringConst.signIn.btnSignIn}</Text>
      </SpinnerButton>
    </View>
  );
}
