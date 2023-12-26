import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import styleSheet from './FullScreenStyles';
import type { FullScreenProgressHandleType } from './FullScreenTypes';

/**
 * A full screen progress indicator that can be used to show the user that something is happening.
 * @param {Record<string, any>} props - the props to pass to the ActivityIndicator
 * @param {React.Ref<FullScreenProgressHandleType>} ref - the ref to pass to the ActivityIndicator
 * @returns {React.ReactElement} A React Element.
 */
function CustomFullScreenProgress(
  props: Record<string, any>,
  ref: React.Ref<FullScreenProgressHandleType>
): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(false);
  const { styles, themeMode } = useTheme(styleSheet);
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
      <ActivityIndicator size="large" color={Colors[themeMode]?.secondary} {...props} />
    </View>
  );
}

const FullScreenProgress = forwardRef(CustomFullScreenProgress) as (
  props: Record<string, any> & { ref: React.Ref<FullScreenProgressHandleType> }
) => ReturnType<typeof CustomFullScreenProgress>;
export default FullScreenProgress;
