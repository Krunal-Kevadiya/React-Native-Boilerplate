import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

type KeyboardType = 'default' | 'email-address' | 'number-pad' | 'phone-pad';

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

type TextFieldsPropsType = {
  selectedIndex: number;
  digits: string[];
  digitsMemo: string[];
  setDigits: (digits: string[]) => void;
  setSelectedIndex: (index: number) => void;
} & OtpInputType;

export type OneInputFieldPropsType = {
  index: number;
} & TextFieldsPropsType;

export type UseOtpInputPropsType = {
  pinCount: number;
  onCodeFilled?: (code: string) => void;
  onCodeChanged?: (code: string) => void;
  clearInputs?: boolean;
  autoFocusOnLoad?: boolean;
  code?: string;
};

export type UseOtpInputReturnType = {
  digits: string[];
  setDigits: React.Dispatch<React.SetStateAction<string[]>>;
  digitsMemo: string[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  handlePress: () => void;
};
