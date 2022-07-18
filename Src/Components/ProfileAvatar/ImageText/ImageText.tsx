import React from 'react';
import { Text } from 'react-native';
import { getTwoInitialCharacters } from '@utils';
import type ImageTextPropsType from './ImageText.type';

export default function ImageText({ text, textStyle }: ImageTextPropsType): React.ReactElement {
  return <Text style={textStyle}>{getTwoInitialCharacters(text)}</Text>;
}
