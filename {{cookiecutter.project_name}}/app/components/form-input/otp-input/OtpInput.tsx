import React from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
  StyleSheet
} from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { isPresentValue } from '@utils';
import styleSheet from './OtpInputStyles';
import { handleChangeText, handleKeyPressTextInput, isAutoFillSupported } from './OtpInputUtils';
import { fieldList, useOtpInput } from './useOtpInput';
import { defaultProps, type OtpInputPropsType, type UseOtpInputReturnType, type OneInputFieldPropsType } from './OtpInputTypes';

/**
 * A component that renders a single input field for the OneInputField component.
 * @param {OneInputFieldPropsType} props - The props for the OneInputField component.
 * @returns {React.ReactElement} A React Element.
 */
function OneInputField({
  index,
  pinCount,
  clearInputs,
  codeInputFieldStyle,
  codeInputHighlightStyle,
  onCodeFilled,
  onCodeChanged,
  placeholderCharacter,
  placeholderTextColor,
  selectedIndex,
  digits,
  digitsMemo,
  setDigits,
  setSelectedIndex,
  ...restProps
}: OneInputFieldPropsType): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const { color: defaultPlaceholderTextColor } = { ...styles.defaultTextFieldStyle, ...codeInputFieldStyle };
  const inputValue: string | undefined = !clearInputs ? digits[index] : '';
  const isFilledValue: boolean = isPresentValue(inputValue);

  return (
    <View pointerEvents="none">
      <TextInput
        underlineColorAndroid="transparent"
        style={
          selectedIndex === index || isFilledValue
            ? StyleSheet.flatten([styles.defaultTextFieldStyle, codeInputFieldStyle, codeInputHighlightStyle])
            : StyleSheet.flatten([styles.defaultTextFieldStyle, codeInputFieldStyle])
        }
        value={inputValue}
        textContentType={isAutoFillSupported ? 'oneTimeCode' : 'none'}
        key={index}
        placeholder={placeholderCharacter}
        placeholderTextColor={placeholderTextColor || defaultPlaceholderTextColor}
        // @ts-ignore
        ref={(ref?: React.LegacyRef<TextInput>) => {
          fieldList[index] = ref;
        }}
        onChangeText={(text: string) => {
          handleChangeText(index, text, pinCount, digitsMemo, onCodeFilled, onCodeChanged, setDigits, setSelectedIndex);
        }}
        onKeyPress={({ nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
          handleKeyPressTextInput(
            index,
            key,
            pinCount,
            digitsMemo,
            onCodeFilled,
            onCodeChanged,
            setDigits,
            setSelectedIndex
          );
        }}
        {...restProps}
      />
    </View>
  );
}

/**
 * The OtpInput component is a component that takes in a code and displays it as a series of input fields.
 * @param {OtpInputPropsType} props - the props for the OtpInput component.
 * @returns {React.ReactElement} A React Element.
 */
export function OtpInput({
  code,
  style,
  pinCount,
  clearInputs,
  autoFocusOnLoad,
  onCodeFilled,
  onCodeChanged,
  ...restProps
}: OtpInputPropsType): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const { digits, setDigits, digitsMemo, selectedIndex, setSelectedIndex, handlePress }: UseOtpInputReturnType =
    useOtpInput({
      code,
      autoFocusOnLoad,
      clearInputs,
      pinCount,
      onCodeFilled,
      onCodeChanged
    });
  const array = new Array(pinCount).fill(<View />);

  return (
    <View style={style}>
      <TouchableWithoutFeedback style={styles.touchableContainer} onPress={handlePress}>
        <View style={styles.viewContainer}>
          {array.map((_: View, index: number) => (
            <OneInputField
              key={`${pinCount - index}view`}
              index={index}
              pinCount={pinCount}
              clearInputs={clearInputs}
              selectedIndex={selectedIndex}
              digits={digits}
              digitsMemo={digitsMemo}
              setDigits={setDigits}
              setSelectedIndex={setSelectedIndex}
              onCodeFilled={onCodeFilled}
              onCodeChanged={onCodeChanged}
              {...restProps}
            />
          ))}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

OtpInput.defaultProps = defaultProps;
