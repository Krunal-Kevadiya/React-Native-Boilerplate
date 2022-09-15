import React from 'react';
import { StyleSheet, View } from 'react-native';

import { UserResponse } from '@models';

import { Circle } from './circle';
import { OverflowCircle } from './overflow_circle';
import styles from './ProfileAvatarPileStyle';
import { defaultProps } from './ProfileAvatarPileTypes';

import type { ProfileAvatarPilePropsType } from './ProfileAvatarPileTypes';

export default function ProfileAvatarPile({
  faces,
  overflow,
  circleSize,
  hideOverflow,
  containerStyle,
  circleStyle,
  imageStyle,
  overflowStyle,
  overflowLabelStyle
}: ProfileAvatarPilePropsType): React.ReactElement {
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {overflow > 0 && !hideOverflow && (
        <OverflowCircle
          overflow={overflow}
          circleStyle={circleStyle}
          overflowStyle={overflowStyle}
          overflowLabelStyle={overflowLabelStyle}
          circleSize={circleSize}
        />
      )}
      {Array.isArray(faces) &&
        faces
          .slice(0, faces.length - overflow)
          .map((face: UserResponse, index: number, array: UserResponse[]) => (
            <Circle
              key={face.id || index}
              delay={(array.length - index) * 2}
              face={face}
              circleStyle={circleStyle}
              imageStyle={imageStyle}
              circleSize={circleSize}
            />
          ))}
    </View>
  );
}

ProfileAvatarPile.defaultProps = defaultProps;
