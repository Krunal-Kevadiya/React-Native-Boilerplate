import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import SpinnerButton from 'react-native-spinner-button';
import { useSelector } from 'react-redux';
import { useTheme } from 'rn-custom-style-sheet';
import { FormInput } from '@components';
import { StringConst } from '@constants';
import { AppRequestSelectors } from '@stores';
import { Colors } from '@themes';
import type { SignInFormPropsType } from './SignInForm.type';
import type { RootStateType } from '@stores';
import { isRemainingToFillForm } from '../SignIn.util';
import styleSheet from './SignInForm.style';

export default function SignInForm(props: SignInFormPropsType): React.ReactElement {
  const styles = useTheme(styleSheet);
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
        placeholderTextColor={Colors.gray}
        keyboardType="email-address"
        selectionColor={Colors.secondary}
        style={styles.textInput}
        containerStyle={styles.textInputContainer}
        errorColor={Colors.error}
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
        placeholderTextColor={Colors.gray}
        selectionColor={Colors.secondary}
        style={styles.textInput}
        containerStyle={styles.textInputContainer}
        errorColor={Colors.error}
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
        spinnerColor={Colors.secondary}
        disabled={disabled}
        isLoading={loading}
        onPress={handleSubmit}
      >
        <Text style={StyleSheet.flatten([styles.textLabel, styles.buttonText])}>{StringConst.signIn.btnSignIn}</Text>
      </SpinnerButton>
    </View>
  );
}
