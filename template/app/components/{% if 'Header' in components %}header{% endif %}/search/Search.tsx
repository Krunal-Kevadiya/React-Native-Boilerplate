import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { Icons } from '@assets';
import { useDebounce, useWillUnmount } from '@hooks';
import { Colors } from '@themes';
import { Icon } from '../../icon';
import styleSheet from './SearchStyles';
import type { SearchPropsType } from './SearchTypes';

/**
 * A header search component
 * @param {SearchPropsType}  - isLowerCase: boolean - If true, the search text will be converted to
 * lower case.
 * @param {String} labelCancel - search cancel button label.
 * @param {(text: string) => void} onSearchQuery - callback function that is called when text is entered.
 * @param {() => void} handleCancel - callback function that is called when cancel button is pressed.
 * @returns {React.ReactElement} A React Element.
 */
export default function Search({
  isLowerCase,
  labelCancel,
  onSearchQuery,
  handleCancel,
  ...restProps
}: SearchPropsType): React.ReactElement {
  const { styles, themeMode } = useTheme(styleSheet);
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
          {...restProps}
          autoFocus
          //value={searchText}
          returnKeyType="search"
          style={StyleSheet.flatten([styles.inputSearch, restProps.style])}
          placeholderTextColor={Colors[themeMode]?.gray}
          keyboardType="default"
          selectionColor={Colors[themeMode]?.secondary}
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
