import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import SpinnerButton from 'react-native-spinner-button';
import { useTheme } from 'rn-custom-style-sheet';
import { FormInput } from '@components';
import { StringConst } from '@constants';
import { Colors } from '@themes';
import { isRemainingToFillForm } from '../SignInUtils';
import styleSheet from './SignInFormStyles';
import type { SignInFormPropsType } from './SignInFormTypes';

/**
 * The sign in form component.
 * @param SignInFormPropsType props - The props for the sign in form.
 * @returns A sign in form component.
 */
export default function SignInForm(props: SignInFormPropsType): React.ReactElement {
  const { styles, theme } = useTheme(styleSheet);
  const inputPasswordRef: React.LegacyRef<TextInput> = React.createRef();
  const { handleSubmit, values, errors, loading } = props;
  const disabled: boolean = isRemainingToFillForm(values, errors);

  return (
    <View style={styles.formContainer}>
      <FormInput
        autoFocus
        id="email"
        returnKeyType="next"
        label={StringConst.Auth.textEmail}
        placeholder={StringConst.Auth.inputEmail}
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
        label={StringConst.Auth.textPassword}
        placeholder={StringConst.Auth.inputPassword}
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
        value={StringConst.Auth.textSignInDesc}
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
        <Text style={StyleSheet.flatten([styles.textLabel, styles.buttonText])}>
          {StringConst.Auth.btnSignIn}
        </Text>
      </SpinnerButton>
    </View>
  );
}
