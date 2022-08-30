import isEqual from 'lodash/isEqual';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { scale, windowWidth, useCurrentTheme } from 'rn-custom-style-sheet';
import { useStatusBarHeight } from '@hooks';
import { Colors } from '@themes';
import { colorOpacity } from '@utils';
import type { HorizontalProgressHandleType } from './HorizontalType';
import type { ThemeType } from 'rn-custom-style-sheet';
import styles from './HorizontalStyle';

function CustomHorizontalProgress(
  props: Record<string, any>,
  ref: React.Ref<HorizontalProgressHandleType>
): React.ReactElement {
  const [progress, setProgress] = useState<number>(0);
  const themeType: ThemeType = useCurrentTheme();
  const statusBarHeight: number = useStatusBarHeight();
  const isDarkTheme: boolean = isEqual(themeType, 'dark');

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
    <View style={StyleSheet.flatten([styles.containerStyle, styles.centerAlign, { top: statusBarHeight }])}>
      <Progress.Bar
        progress={progress}
        width={windowWidth - scale(5)}
        height={scale(5)}
        color={colorOpacity(Colors.secondary, 0.5)}
        unfilledColor={colorOpacity(isDarkTheme ? Colors.white : Colors.primary, 0.5)}
        borderColor={Colors.secondary}
        {...props}
      />
    </View>
  );
}

const HorizontalProgress = forwardRef(CustomHorizontalProgress) as (
  props: Record<string, any> & { ref: React.Ref<HorizontalProgressHandleType> }
) => ReturnType<typeof CustomHorizontalProgress>;
export default HorizontalProgress;
