import React from 'react';
import { Text, Pressable } from 'react-native';
import CodePush from 'react-native-code-push';
import { useTheme } from 'rn-custom-style-sheet';
import { StringConst } from '@constants';
import { useHeaderHeight, useStatusBarHeight } from '@hooks';
import { Draggable } from '../common';
import styleSheet from './MovableViewStyles';
import type { MovableViewPropsType } from './MovableViewTypes';

/**
 * A React component that displays a movable view that can be dragged up and down.
 * @param {MovableViewPropsType} props - The props for the component.
 * @returns {React.ReactElement} A React Element.
 */
function MovableView({ message, isBtnVisible }: MovableViewPropsType): React.ReactElement {
  const statusBarHeight: number = useStatusBarHeight();
  const headerHeight: number = useHeaderHeight();
  const { styles } = useTheme(styleSheet);

  return (
    <Draggable
      style={styles.container}
      padding={statusBarHeight}
      height={headerHeight}
      maxWidth={0}
    >
      <>
        <Text style={styles.textHeader}>{message}</Text>
        {isBtnVisible && (
          <Pressable
            style={styles.buttonView}
            onPress={() => {
              CodePush.allowRestart();
            }}
          >
            <Text style={styles.textButton}>{StringConst.CodePush.btnRestart}</Text>
          </Pressable>
        )}
      </>
    </Draggable>
  );
}

export default MovableView;
