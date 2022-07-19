import React from 'react';
import { TextInput, TextStyle, ViewStyle } from 'react-native';
import { XmlProps } from 'react-native-svg';
import type { FormikErrors } from 'formik';

type DictionaryType = {
  [key: string]: string;
};

type LocalTextInputPropsType = React.ComponentProps<typeof TextInput>;
type TextInputPropsType = Omit<LocalTextInputPropsType, 'ref'>;

type LabelPropsType =
  | {
      label?: string;
      labelStyle?: TextStyle;
      labelColor?: string;
    }
  | {
      label?: never;
      labelStyle?: never;
      labelColor?: never;
    };
type LeftIconPropsType =
  | {
      leftIconSource?: string;
      leftIconSize?: number;
      leftSvgStyle?: XmlProps;
    }
  | {
      leftIconSource?: never;
      leftIconSize?: never;
      leftSvgStyle?: never;
    };
type RightIconPropsType =
  | {
      rightIconSource?: string;
      rightIconSize?: number;
      rightSvgStyle?: XmlProps;
      rightIconPress?: () => void;
    }
  | {
      rightIconSource?: never;
      rightIconSize?: never;
      rightSvgStyle?: never;
      rightIconPress?: never;
    };

type LocalFormInputType = {
  id: string;
  errorColor?: string;
  errorMsg?: string;
  divider?: string;
  isLowerCase?: boolean;
  isPhoneCase?: boolean;
  isTagInput?: boolean;
  isDisableError?: boolean;
  values?: any;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  errors?: FormikErrors<DictionaryType>;
  setErrors?: (errors: FormikErrors<DictionaryType>) => void;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  setFieldTouched?: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
} & LabelPropsType &
  LeftIconPropsType &
  RightIconPropsType;
export type FormInputPropsType = LocalFormInputType & TextInputPropsType;

export const defaultProps = {
  isLowerCase: false,
  isPhoneCase: false,
  isTagInput: false,
  isDisableError: false,
  rightIconSize: 24
};
