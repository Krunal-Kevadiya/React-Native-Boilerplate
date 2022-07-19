import React from 'react';
import { StyleSheet, View } from 'react-native';
import { UserResponse } from '@models';
import type { ProfileAvatarPilePropsType } from './ProfileAvatarPile.type';
import { Circle } from './Circle';
import { OverflowCircle } from './OverflowCircle';
import styles from './ProfileAvatarPile.style';
import { defaultProps } from './ProfileAvatarPile.type';

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
