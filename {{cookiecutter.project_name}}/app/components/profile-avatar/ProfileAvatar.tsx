import omit from 'lodash/omit';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { isPresentValue } from '@utils';
import { ImageOverlap } from './image-overlap';
import { ImageStatic } from './image-static';
import { ImageText } from './image-text';
import { ImageUrl } from './image-url';
import type ProfileAvatarPropsType from './ProfileAvatarTypes';
import type { ImageStyle as FastImageStyle } from 'react-native-fast-image';

/**
 * A component that renders an image from a URL, an image from a static source, or a text string.
 * @param {ProfileAvatarPropsType} props - the props for the component.
 * @returns {React.ReactElement} A React Element.
 */
export default function ProfileAvatar({
  url,
  image,
  text,
  source,
  style,
  size,
  textStyle,
  svgStyle,
  onPress
}: ProfileAvatarPropsType): React.ReactElement {
  const [load, setLoad] = useState(false);
  const isUrl: boolean = isPresentValue(url);
  const isImage: boolean = !isUrl && isPresentValue(image) && image !== -1;
  const isSource: boolean = isPresentValue(source);
  const isText: boolean = !isUrl && !isImage && isPresentValue(text);
  const localStyle =
    isUrl && !load ? omit(StyleSheet.flatten(style), 'backgroundColor') : StyleSheet.flatten(style);

  return (
    <Pressable onPress={onPress}>
      <View style={localStyle}>
        {isUrl && (
          <ImageUrl
            url={url}
            imageStyle={localStyle as FastImageStyle}
            onLoading={(loading: boolean) => {
              setLoad(loading);
            }}
          />
        )}
        {isImage && <ImageStatic image={image as string} size={size} svgStyle={svgStyle} />}
        {isText && <ImageText text={text} textStyle={textStyle} />}
        {isSource && !load && (
          <ImageOverlap source={source as string} size={size} style={style} svgStyle={svgStyle} />
        )}
      </View>
    </Pressable>
  );
}
