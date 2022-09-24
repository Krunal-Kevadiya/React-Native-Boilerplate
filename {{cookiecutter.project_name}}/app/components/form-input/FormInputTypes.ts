import React from 'react';
import { TextInput, type TextStyle, type ViewStyle } from 'react-native';
import type { FormikErrors } from 'formik';
import type { XmlProps } from 'react-native-svg';

type DictionaryType = {
  [key: string]: string;
};

type LocalTextInputPropsType = React.ComponentProps<typeof TextInput>;

type TextInputPropsType = Omit<LocalTextInputPropsType, 'ref'>;

/**
 * A type alias for the props that can be passed to the Label component.
 * @typedef {object} LabelPropsType
 * @property {string} [label] - The text to display in the label.
 * @property {TextStyle} [labelStyle] - The style of the label.
 * @property {string} [labelColor] - The color of the label.
 */
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

/**
 * A type for the props of the left icon.
 * @typedef {object} LeftIconPropsType
 * @property {string} [leftIconSource] - The source of the icon.
 * @property {number} [leftIconSize] - The size of the icon.
 * @property {XmlProps} [leftSvgStyle] - The style of the icon.
 */
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

/**
 * A type for the props of the right icon.
 * @param {RightIconPropsType} props - The props for the component.
 * @property {string} [rightIconSource] - The source of the icon.
 * @property {number} [rightIconSize] - The size of the icon.
 * @property {XmlProps} [rightSvgStyle] - The style of the icon.
 */
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

/**
 * A type that represents the form input.
 * @param {LocalFormInputType} props - The props for the component.
 * @returns A custom input component that can be used in a form.
 */
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
