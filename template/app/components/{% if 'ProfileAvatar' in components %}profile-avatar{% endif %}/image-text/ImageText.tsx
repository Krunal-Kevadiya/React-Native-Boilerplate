import React from 'react';
import { Text } from 'react-native';
import { getTwoInitialCharacters } from '@utils';
import type ImageTextPropsType from './ImageTextTypes';

/**
 * A text image component.
 * @param {string} text - the text to display.
 * @param {TextStyle} textStyle - the style to apply to the text.
 * @returns {React.ReactElement} A React Element.
 */
export default function ImageText({ text, textStyle }: ImageTextPropsType): React.ReactElement {
  return <Text style={textStyle}>{getTwoInitialCharacters(text)}</Text>;
}
