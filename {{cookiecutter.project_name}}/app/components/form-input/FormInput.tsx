import React, { forwardRef, memo, useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { useDeepCompareCallback } from '@hooks';
import { isPresentValue } from '@utils';
import { Icon } from '../icon';
import styleSheet from './FormInputStyles';
import { defaultProps, type FormInputPropsType } from './FormInputTypes';
import { getChangeValue } from './FormInputUtils';
import { TagInput } from './tag-input';

/**
 * A custom input component that can be used in a form.
 * @param {FormInputPropsType} props - the props for the component.
 * @param {React.LegacyRef<TextInput> | undefined} ref - the ref for the component.
 * @returns {React.ReactElement} A React Element.
 */
function CustomInput(
  {
    id,
    label,
    labelStyle,
    labelColor,
    leftIconSource,
    leftIconSize,
    leftSvgStyle,
    rightIconSource,
    rightIconSize = defaultProps.rightIconSize,
    rightSvgStyle,
    rightIconPress,
    errorColor,
    errorMsg,
    divider,
    isLowerCase = defaultProps.isLowerCase,
    isPhoneCase = defaultProps.isPhoneCase,
    isTagInput = defaultProps.isTagInput,
    values,
    errors,
    setFieldValue,
    setFieldTouched,
    setErrors,
    containerStyle,
    inputContainerStyle,
    isDisableError = defaultProps.isDisableError,
    style,
    ...inputProps
  }: FormInputPropsType,
  ref: React.LegacyRef<TextInput> | undefined
): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const [isFocus, setFocus] = useState<boolean>(false);

  const handleChange = useCallback<(value: string) => void>(
    (value: string) => {
      setFieldValue?.(id, getChangeValue(isLowerCase, isPhoneCase, value));
      const localErrors = { ...errors };
      localErrors[id] = '';
      setErrors?.(localErrors);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errors]
  );

  const handleBlur = useDeepCompareCallback<() => void>(() => {
    let text = (isLowerCase ? values?.[id]?.trim()?.toLowerCase() : values?.[id]?.trim()) || '';
    setFieldValue?.(id, text);
    setFieldTouched?.(id, true);
    setFocus(false);
  }, [values]);

  const handleFocus = useCallback<() => void>(() => {
    setFocus(true);
  }, []);

  const wasTouched: boolean | undefined = isPresentValue(values?.[id]);
  const fieldError: string | undefined = (wasTouched && errors?.[id]) || errorMsg;

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <View
        style={StyleSheet.flatten([
          styles.inputContainer,
          inputContainerStyle,
          isFocus && styles.inputContainerActive,
          isPresentValue(fieldError) && !isDisableError && styles.inputContainerError
        ])}
      >
        {leftIconSource && <Icon type="svg" source={leftIconSource} size={leftIconSize} svgStyle={leftSvgStyle} />}
        {label && (
          <Text
            style={StyleSheet.flatten([
              styles.textLabel,
              labelStyle,
              isPresentValue(labelColor) && { color: labelColor }
            ])}
          >
            {label}
          </Text>
        )}
        {!isTagInput && (
          <TextInput
            ref={ref}
            //value={values?.[id]}
            underlineColorAndroid="transparent"
            style={StyleSheet.flatten([styles.input, style])}
            onChangeText={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...inputProps}
          />
        )}
        {isTagInput && (
          <TagInput
            ref={ref}
            values={values?.[id] || inputProps.value}
            underlineColorAndroid="transparent"
            style={StyleSheet.flatten([styles.input, style])}
            onChangeText={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...inputProps}
          />
        )}
        {rightIconSource && (
          <Pressable onPress={rightIconPress}>
            <Icon type="svg" source={rightIconSource} size={rightIconSize} svgStyle={rightSvgStyle} />
          </Pressable>
        )}
      </View>
      {isPresentValue(divider) && (
        <View
          style={StyleSheet.flatten([
            styles.normalLine,
            { backgroundColor: isFocus ? inputProps.selectionColor : divider }
          ])}
        />
      )}
      {isPresentValue(fieldError) && !isDisableError && (
        <Text style={StyleSheet.flatten([styles.errorMsg, { color: errorColor }])}>{fieldError}</Text>
      )}
    </View>
  );
}

const FormInput = memo(forwardRef(CustomInput));
export default FormInput;
