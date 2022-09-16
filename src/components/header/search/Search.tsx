import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';

import { Icons } from '@assets';
import { useDebounce, useWillUnmount } from '@hooks';
import { Colors } from '@themes';

import { Icon } from '../../icon';

import styleSheet from './SearchStyle';

import type { SearchPropsType } from './SearchTypes';

export default function Search({
  isLowerCase,
  labelCancel,
  onSearchQuery,
  handleCancel,
  ...inputProps
}: SearchPropsType): React.ReactElement {
  const { styles, theme } = useTheme(styleSheet);
  const [searchText, setSearchText] = useState<string>('');

  const handleChange = useCallback<(value: string) => void>(
    (value: string) => {
      const text = isLowerCase ? value?.trim()?.toLowerCase() : value?.trim();
      setSearchText(text);
    },
    [isLowerCase]
  );

  const handleBlur = useCallback<() => void>(() => {
    handleChange(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleLocalCancel = useCallback<() => void>(() => {
    handleChange('');
    handleCancel?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchUsername, { cancel }] = useDebounce<string>(searchText, 1000, {
    maxWait: 2000,
    trailing: true
  });

  useEffect(() => {
    onSearchQuery?.(searchUsername);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchUsername]);

  useWillUnmount(() => {
    cancel();
  });

  return (
    <View style={StyleSheet.flatten([styles.container, styles.centerSide])}>
      <View style={styles.searchContainer}>
        <Icon type="svg" source={Icons.icSearch} style={styles.imageSearch} size={24} />
        <TextInput
          {...inputProps}
          autoFocus
          //value={searchText}
          returnKeyType="search"
          style={StyleSheet.flatten([styles.inputSearch, inputProps.style])}
          placeholderTextColor={Colors[theme]?.gray}
          keyboardType="default"
          selectionColor={Colors[theme]?.secondary}
          onChangeText={handleChange}
          onBlur={handleBlur}
          onSubmitEditing={handleBlur}
        />
        <Pressable onPress={handleLocalCancel}>
          <Text style={styles.textLabel}>{labelCancel}</Text>
        </Pressable>
      </View>
      <View style={styles.normalLine} />
    </View>
  );
}
