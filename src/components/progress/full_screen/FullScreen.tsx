import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';

import { Colors } from '@themes';

import styleSheet from './FullScreenStyle';

import type { FullScreenProgressHandleType } from './FullScreenTypes';

function CustomFullScreenProgress(
  props: Record<string, any>,
  ref: React.Ref<FullScreenProgressHandleType>
): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(false);
  const { styles, theme } = useTheme(styleSheet);
  useImperativeHandle(ref, () => ({
    show: (): void => {
      setVisible(true);
    },
    hide: (): void => {
      setVisible(false);
    }
  }));

  if (!visible) {
    return <></>;
  }

  return (
    <View style={StyleSheet.flatten([styles.containerStyle, styles.centerAlign])}>
      <ActivityIndicator size="large" color={Colors[theme]?.secondary} {...props} />
    </View>
  );
}

const FullScreenProgress = forwardRef(CustomFullScreenProgress) as (
  props: Record<string, any> & { ref: React.Ref<FullScreenProgressHandleType> }
) => ReturnType<typeof CustomFullScreenProgress>;
export default FullScreenProgress;
