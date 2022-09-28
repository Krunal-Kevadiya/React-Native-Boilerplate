import React, { forwardRef } from 'react';
import { View, Text, TextInput, type TextProps, StyleSheet, type TextStyle, type StyleProp } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { Colors, isAndroid, isIos } from '@themes';
import { colorOpacity, isPresentValue } from '@utils';
import styleSheet from './TagInputStyle';
import { removePrefixOrPostfixText, textExtraction, removeHtmlTags } from './TagInputUtil';
import useTagInput from './useTagInput';
import { defaultProps, type MatchPartType, type ParseType, type TagInputPropsType, type UseTagInputReturnType } from './TagInputTypes';

/**
 * Takes in a string of code and parses it for the given parse type.
 * @param {string} values - the string of code to parse
 * @param {ParseType[]} parse - the parse type to use
 * @returns {MatchPartType[]} - the parsed text
 */
function getParsedText(
  parse: ParseType[],
  childrenProps: TextProps,
  values: string,
  parentStyle: StyleProp<TextStyle>,
  editable: boolean
): (React.ReactElement | undefined)[] {
  let components: (React.ReactElement | undefined)[] = [];
  components = textExtraction(values, parse).map((props: MatchPartType) => {
    const { style, type, children, onPress, onLongPress } = props;
    const text = removePrefixOrPostfixText(editable ? undefined : type, children);
    if (editable && isIos) {
      <TextInput
        key={text}
        style={StyleSheet.flatten([parentStyle, style])}
        {...childrenProps}
        //onLongPress={onLongPress}
        //onPress={onPress}
      >
        {text}
      </TextInput>;
    } else {
      return (
        <Text
          key={text}
          style={StyleSheet.flatten([parentStyle, style])}
          {...childrenProps}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          {text}
        </Text>
      );
    }
  });
  return components;
}

/**
 * A custom input with tag that can be used to enter tags.
 * @param {TagInputPropsType} props - The props for the component.
 * @param {React.LegacyRef<TextInput> | undefined} ref - The ref for the component.
 * @returns {React.ReactElement} A React Element.
 */
function CustomTabInput(
  {
    editable = defaultProps.editable,
    parse,
    children,
    childrenProps = defaultProps.childrenProps,
    selectionProps = defaultProps.selectionProps,
    values,
    handlePress,
    isCollapse,
    isPlayerUI = defaultProps.isPlayerUI,
    style: parentStyle,
    placeholder,
    placeholderTextColor,
    ...restProps
  }: TagInputPropsType,
  ref: React.LegacyRef<TextInput> | undefined
): React.ReactElement {
  const { styles, theme } = useTheme(styleSheet);
  const { parseArrayJson }: UseTagInputReturnType = useTagInput(handlePress);
  const localSelectionProps = {
    ...selectionProps,
    selectable: !!(isAndroid || isPlayerUI),
    selectionColor: colorOpacity(Colors[theme]?.secondary, 0.4)
  };
  const newValues: string = removeHtmlTags(values, isCollapse);

  return (
    <View>
      {editable && isPresentValue(newValues) && (
        <TextInput style={parentStyle} {...restProps} {...localSelectionProps} ref={ref}>
          {getParsedText(
            parse || parseArrayJson,
            { ...localSelectionProps, ...childrenProps },
            newValues,
            parentStyle,
            editable
          )}
          {children}
        </TextInput>
      )}
      {!editable && isPresentValue(newValues) && (
        <View>
          <Text {...restProps} {...localSelectionProps}>
            {getParsedText(
              parse || parseArrayJson,
              { ...localSelectionProps, ...childrenProps },
              newValues,
              parentStyle,
              editable
            )}
          </Text>
          {children}
        </View>
      )}
      {!isPresentValue(newValues) && isPresentValue(placeholder) && (
        <Text
          style={StyleSheet.flatten([
            parentStyle,
            styles.placeholder,
            placeholderTextColor ? { color: placeholderTextColor } : {}
          ])}
          {...restProps}
        >
          {placeholder}
          {children}
        </Text>
      )}
    </View>
  );
}

const TagInput = forwardRef(CustomTabInput) as (
  props: TagInputPropsType & { ref: React.LegacyRef<TextInput> | undefined }
) => ReturnType<typeof CustomTabInput>;
export default TagInput;
