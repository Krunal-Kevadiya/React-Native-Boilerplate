import React, { useCallback } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import { isPresentValue } from '@utils';
import type { FabButtonPropsType } from './FabButtonType';
import { Icon } from '../../icon';
import styleSheet from './FabButtonStyle';

export default function FabButton({
  onPress,
  style,
  containerStyle,
  text,
  textStyle,
  isRight,
  isLoading,
  ...OtherProps
}: FabButtonPropsType): React.ReactElement {
  const loading: boolean = isLoading === true ? true : false;
  const { styles } = useTheme(styleSheet);
  const handlePress = useCallback<() => void>(() => {
    if (!loading) {
      onPress?.();
    }
  }, [loading, onPress]);

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <Pressable style={StyleSheet.flatten([styles.buttonContainer, style])} onPress={handlePress}>
        {loading && <ActivityIndicator size={'small'} color={Colors.secondary} />}
        {!loading && (
          <>
            {isPresentValue(OtherProps.source) && isRight !== true && <Icon {...OtherProps} />}
            {isPresentValue(text) && <Text style={textStyle}>{text}</Text>}
            {isPresentValue(OtherProps.source) && isRight === true && <Icon {...OtherProps} />}
          </>
        )}
      </Pressable>
    </View>
  );
}
