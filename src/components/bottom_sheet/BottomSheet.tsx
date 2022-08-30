import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StatusBar, Text, View, FlatList, StyleSheet, type LayoutChangeEvent } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from 'rn-custom-style-sheet';
import { isPresentValue } from '@utils';
import type { BottomSheetHandleType, BottomSheetPropsType } from './BottomSheetType';
import styleSheet from './BottomSheetStyle';

function CustomBottomSheet<T>(
  { title, message, onSwipeComplete, onBackButtonPress, children, ...extraFlatListProps }: BottomSheetPropsType<T>,
  ref: React.Ref<BottomSheetHandleType>
): React.ReactElement {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [swipeThresholdHeight, setSwipeThresholdHeight] = useState<number>(0);
  const { styles } = useTheme(styleSheet);
  const { data, style, ...otherFlatlistProps } = extraFlatListProps;
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
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
        StatusBar.setHidden(false, 'slide');
        setVisible(false);
        onSwipeComplete?.();
      }}
      onBackButtonPress={() => {
        StatusBar.setHidden(false, 'slide');
        setVisible(false);
        onBackButtonPress?.();
      }}
      onModalWillShow={() => StatusBar.setHidden(true, 'slide')}
      onModalWillHide={() => StatusBar.setHidden(false, 'slide')}
    >
      <View style={styles.popupStyle}>
        <View
          style={styles.popupContainerStyle}
          onLayout={(event: LayoutChangeEvent) => setSwipeThresholdHeight(event.nativeEvent.layout.height * 0.2)}
        >
          <View style={styles.containerViewStyle}>
            <View style={styles.popupDismissLine} />
            {isPresentValue(title) && (
              <Text style={styles.titleText} numberOfLines={1}>
                {title}
              </Text>
            )}
            {isPresentValue(message) && <Text style={styles.messageText}>{message}</Text>}
            {data && (
              <FlatList
                style={StyleSheet.flatten([styles.list, !children && styles.listMargin, style])}
                showsVerticalScrollIndicator={false}
                data={data}
                {...otherFlatlistProps}
              />
            )}
            {children && children}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const BottomSheet = forwardRef(CustomBottomSheet) as <T>(
  props: BottomSheetPropsType<T> & { ref: React.Ref<BottomSheetHandleType> }
) => ReturnType<typeof CustomBottomSheet>;
export default BottomSheet;
