import React, { forwardRef, useImperativeHandle, useState, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  type LayoutChangeEvent
} from 'react-native';
import Modal from 'react-native-modal';
import { type UseScaleUtilsReturnType, useScaleUtils, useTheme } from 'rn-custom-style-sheet';
import { Icons } from '@assets';
import { isIos, Colors } from '@themes';
import { isPresentValue } from '@utils';
import { Icon } from '../icon';
import styleSheet from './BottomSheetStyles';
import { DashedLine } from './dashed-line';
import type { BottomSheetHandleType, BottomSheetPropsType } from './BottomSheetTypes';

/**
 * A custom bottom sheet component.
 * @param {BottomSheetPropsType<T>} props - the props to pass to the bottom sheet.
 * @param {React.Ref<BottomSheetHandleType>} ref - the ref to pass to the bottom sheet.
 * @returns {React.ReactElement} A React Element.
 */
function CustomBottomSheet<T>(
  {
    title,
    message,
    onSwipeComplete,
    onBackButtonPress,
    onDismiss,
    children,
    ...restProps
  }: BottomSheetPropsType<T>,
  ref: React.Ref<BottomSheetHandleType>
): React.ReactElement {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [swipeThresholdHeight, setSwipeThresholdHeight] = useState<number>(0);
  const { styles, themeMode } = useTheme(styleSheet);
  const { scale }: UseScaleUtilsReturnType = useScaleUtils();
  const { data, style, renderItem, ...restFlatListProps } = useMemo(() => {
    if (children) {
      return { data: undefined, style: undefined, renderItem: undefined };
    } else {
      return restProps;
    }
  }, [children, restProps]);
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
      onDismiss?.();
    },
    isShow: () => {
      return isVisible;
    }
  }));

  if (!isVisible) {
    return <></>;
  }
  return (
    <Modal
      propagateSwipe
      scrollHorizontal
      coverScreen
      style={styles.popupView}
      swipeDirection={['down']}
      isVisible={isVisible}
      swipeThreshold={swipeThresholdHeight}
      backdropOpacity={0.7}
      customBackdrop={<View style={styles.customBackdrop} />}
      onSwipeComplete={() => {
        setVisible(false);
        onSwipeComplete?.();
        onDismiss?.();
      }}
      onBackButtonPress={() => {
        setVisible(false);
        onBackButtonPress?.();
        onDismiss?.();
      }}
    >
      <KeyboardAvoidingView style={styles.popupStyle} {...(isIos ? { behavior: 'padding' } : {})}>
        <View
          style={styles.popupContainerStyle}
          onLayout={(event: LayoutChangeEvent) =>
            setSwipeThresholdHeight(event.nativeEvent.layout.height * 0.2)
          }
        >
          <View style={styles.containerViewStyle}>
            <View style={styles.popupDismissLine} />
            <View style={styles.headerContainer}>
              <View style={StyleSheet.flatten([styles.flexRow, styles.headerTextContainer])}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setVisible(false);
                    onDismiss?.();
                  }}
                >
                  <Icon
                    type="svg"
                    source={Icons.icCloseCircle}
                    style={styles.closeImage}
                    size={24}
                  />
                </TouchableOpacity>
                {!isPresentValue(title) && (
                  <Text numberOfLines={1} style={styles.titleText}>
                    {title}
                  </Text>
                )}
              </View>
              <DashedLine
                dashLength={scale(5)}
                dashThickness={scale(2)}
                dashGap={scale(3)}
                dashColor={Colors[themeMode]?.dashedLine}
              />
            </View>
            {isPresentValue(message) && <Text style={styles.messageText}>{message}</Text>}
            {!children && data && (
              <FlatList
                style={StyleSheet.flatten([styles.list, !children && styles.listMargin, style])}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                {...restFlatListProps}
              />
            )}
            <View>{children && children}</View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const BottomSheet = forwardRef(CustomBottomSheet) as <T>(
  props: BottomSheetPropsType<T> & { ref: React.Ref<BottomSheetHandleType> }
) => ReturnType<typeof CustomBottomSheet>;
export default BottomSheet;
