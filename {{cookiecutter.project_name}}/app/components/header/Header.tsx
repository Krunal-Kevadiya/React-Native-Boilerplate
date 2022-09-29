import React, { useCallback, useState } from 'react';
import { type LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { useTheme } from 'rn-custom-style-sheet';
import { useHeaderHeight, useStatusBarHeight } from '@hooks';
import { HeaderButton } from './header-button';
import styleSheet from './HeaderStyles';
import { defaultProps } from './HeaderTypes';
import { Search } from './search';
import type { HeaderPropsType } from './HeaderTypes';

/**
 * The header component.
 * @param {HeaderPropsType} props - the props for the header component.
 * @returns {React.ReactElement} A React Element.
 */
export default function Header({
  left,
  customLeftView,
  center,
  right,
  customRightView,

  isLowerCase,
  isSearch,
  labelCancel,
  onSearchQuery,
  handleCancel,

  isBottomLine,
  isLeftAlign,
  ...inputProps
}: HeaderPropsType): React.ReactElement {
  const { styles } = useTheme(styleSheet);
  const [widthLeft, setWidthLeft] = useState<number>(0);
  const [widthRight, setWidthRight] = useState<number>(0);
  const statusBarHeight: number = useStatusBarHeight();
  const headerHeight: number = useHeaderHeight();

  const handleLeftLayout = useCallback<(event: LayoutChangeEvent) => void>((event) => {
    const { width } = event.nativeEvent.layout;
    setWidthLeft(width);
  }, []);

  const handleRightLayout = useCallback<(event: LayoutChangeEvent) => void>((event) => {
    const { width } = event.nativeEvent.layout;
    setWidthRight(width);
  }, []);

  return (
    <View style={StyleSheet.flatten([isBottomLine && styles.bottomLine, { height: headerHeight }, styles.container])}>
      <View pointerEvents="none" style={{ height: statusBarHeight }} />
      {!isSearch && (
        <View pointerEvents="box-none" style={styles.subContainer}>
          <HeaderButton
            isCenterView
            isLeftAlign={isLeftAlign}
            {...center}
            viewStyle={StyleSheet.flatten([center?.viewStyle, { left: widthLeft, right: widthRight }])}
          />
          <View style={styles.rightView} onLayout={handleLeftLayout}>
            {!customLeftView && <HeaderButton isAddMargin isCenterView={false} {...left} />}
            {customLeftView && customLeftView}
          </View>
          <View style={styles.rightView} onLayout={handleRightLayout}>
            {!customRightView && <HeaderButton isAddMargin isCenterView={false} {...right} />}
            {customRightView && customRightView}
          </View>
        </View>
      )}
      {isSearch && (
        <View pointerEvents="box-none" style={styles.subContainer}>
          <Search
            isLowerCase={isLowerCase}
            labelCancel={labelCancel}
            handleCancel={handleCancel}
            onSearchQuery={onSearchQuery}
            {...inputProps}
          />
        </View>
      )}
    </View>
  );
}
Header.defaultProps = defaultProps;
