import React, { useCallback } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import { isNotNullOrEmpty } from '@utils';
import type { FabButtonPropsType } from './FabButton.type';
import { Icon } from '../../Icon';
import styleSheet from './FabButton.style';

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
  const styles = useTheme(styleSheet);
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
            {isNotNullOrEmpty(OtherProps.source) && isRight !== true && <Icon {...OtherProps} />}
            {isNotNullOrEmpty(text) && <Text style={textStyle}>{text}</Text>}
            {isNotNullOrEmpty(OtherProps.source) && isRight === true && <Icon {...OtherProps} />}
          </>
        )}
      </Pressable>
    </View>
  );
}
