import omit from 'lodash/omit';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { isPresentValue } from '@utils';
import type ProfileAvatarPropsType from './ProfileAvatarType';
import type { ImageStyle as FastImageStyle } from 'react-native-fast-image';
import { ImageOverlap } from './image_overlap';
import { ImageStatic } from './image_static';
import { ImageText } from './image_text';
import { ImageUrl } from './image_url';

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
  const localStyle = isUrl && !load ? omit(StyleSheet.flatten(style), 'backgroundColor') : StyleSheet.flatten(style);

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
        {isSource && !load && <ImageOverlap source={source as string} size={size} style={style} svgStyle={svgStyle} />}
      </View>
    </Pressable>
  );
}
