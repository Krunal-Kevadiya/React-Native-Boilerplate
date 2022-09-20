import React from 'react';

import type { TextStyle, ViewStyle } from 'react-native';

type KeyboardType = 'default' | 'email-address' | 'number-pad' | 'phone-pad';

/**
 * A type that represents the props of otp input.
 * @param {OtpInputType} props - the props for the component
 */
export type OtpInputType = {
  pinCount: number;
  codeInputFieldStyle?: TextStyle;
  codeInputHighlightStyle?: TextStyle;
  onCodeFilled?: (code: string) => void;
  onCodeChanged?: (code: string) => void;
  secureTextEntry?: boolean;
  editable?: boolean;
  keyboardType?: KeyboardType;
  placeholderCharacter?: string;
  placeholderTextColor?: string;
  selectionColor?: string;
  clearInputs?: boolean;
  keyboardAppearance?: 'default' | 'dark' | 'light';
};

/**
 * The props for the OtpInput component.
 * @typedef {object} LocalOtpInputPropsType
 * @property {boolean} [autoFocusOnLoad=false] - Whether or not to automatically focus on load.
 * @property {string} [code] - The code to display in the input.
 * @property {ViewStyle} [style] - The style to apply to the input.
 */
type LocalOtpInputPropsType = {
  autoFocusOnLoad?: boolean;
  code?: string;
  style?: ViewStyle;
};
export type OtpInputPropsType = LocalOtpInputPropsType & OtpInputType & typeof defaultProps;

export const defaultProps = {
  pinCount: 6,
  autoFocusOnLoad: true,
  secureTextEntry: false,
  editable: true,
  keyboardAppearance: 'default',
  keyboardType: 'number-pad',
  clearInputs: false,
  placeholderCharacter: '',
  selectionColor: '#000'
};

/**
 * A type that represents the props of test fields.
 * @param {TextFieldsPropsType} props - The props for the component.
 */
type TextFieldsPropsType = {
  selectedIndex: number;
  digits: string[];
  digitsMemo: string[];
  setDigits: (digits: string[]) => void;
  setSelectedIndex: (index: number) => void;
} & OtpInputType;

/**
 * The props for the OneInputField component.
 * @param {number} index - the index of the input field in the form.
 */
export type OneInputFieldPropsType = {
  index: number;
} & TextFieldsPropsType;

/**
 * A custom otp input hook that argument type.
 * @param {number} pinCount - the number of pins in the OTP code.
 * @param {Function} [onCodeFilled] - a callback function that is called when the code is filled.
 * @param {Function} [onCodeChanged] - a callback function that is called when the code is changed.
 * @param {boolean} [clearInputs=false] - whether or not to clear the inputs when the code is filled.
 * @param {boolean} [autoFocusOnLoad=false] - whether or not to auto focus on load.
 */
export type UseOtpInputPropsType = {
  pinCount: number;
  onCodeFilled?: (code: string) => void;
  onCodeChanged?: (code: string) => void;
  clearInputs?: boolean;
  autoFocusOnLoad?: boolean;
  code?: string;
};

/**
 * A custom otp input hook that returns an object containing the digits, setDigits,
 * digitsMemo, selectedIndex, setSelectedIndex, and handlePress.
 * @param {string[]} digits - the OTP code.
 * @param {React.Dispatch<React.SetStateAction<string[]>>} setDigits - set OTP code.
 * @param {string[]} digitsMemo - memories OTP code.
 * @param {number} selectedIndex - the current selected index.
 * @param {React.Dispatch<React.SetStateAction<number>>} setSelectedIndex - set current selected index.
 * @param {() => void} handlePress - a callback function that is called when the user presses.
 */
export type UseOtpInputReturnType = {
  digits: string[];
  setDigits: React.Dispatch<React.SetStateAction<string[]>>;
  digitsMemo: string[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  handlePress: () => void;
};
