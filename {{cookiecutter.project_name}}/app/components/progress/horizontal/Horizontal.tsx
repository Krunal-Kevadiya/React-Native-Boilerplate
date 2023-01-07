import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { scale, windowWidth, useCurrentTheme, type ThemeType } from 'rn-custom-style-sheet';
import { useStatusBarHeight } from '@hooks';
import { Colors } from '@themes';
import { colorOpacity } from '@utils';
import styles from './HorizontalStyles';
import type { HorizontalProgressHandleType } from './HorizontalTypes';

/**
 * A custom horizontal progress bar that can be used to display a progress bar in the
 * status bar.
 * @param {Record<string, any>} props - the props to pass to the progress bar
 * @param {React.Ref<HorizontalProgressHandleType>} ref - the ref to pass to the progress bar
 * @returns {React.ReactElement} A React Element.
 */
function CustomHorizontalProgress(
  props: Record<string, any>,
  ref: React.Ref<HorizontalProgressHandleType>
): React.ReactElement {
  const [progress, setProgress] = useState<number>(0);
  const theme: ThemeType = useCurrentTheme();
  const statusBarHeight: number = useStatusBarHeight();

  useImperativeHandle(ref, () => ({
    setProgress: (value: number): void => {
      setProgress(value);
    },
    clearProgress: (): void => {
      setProgress(0);
    }
  }));

  if (progress < 0.01 || progress > 1.01) {
    return <></>;
  }

  return (
    <View
      style={StyleSheet.flatten([
        styles.containerStyle,
        styles.centerAlign,
        { top: statusBarHeight }
      ])}
    >
      <Progress.Bar
        progress={progress}
        width={windowWidth - scale(5)}
        height={scale(5)}
        color={colorOpacity(Colors[theme]?.secondary, 0.5)}
        unfilledColor={colorOpacity(Colors[theme]?.invertedBlack, 0.5)}
        borderColor={Colors[theme]?.secondary}
        {...props}
      />
    </View>
  );
}

const HorizontalProgress = forwardRef(CustomHorizontalProgress) as (
  props: Record<string, any> & { ref: React.Ref<HorizontalProgressHandleType> }
) => ReturnType<typeof CustomHorizontalProgress>;
export default HorizontalProgress;
