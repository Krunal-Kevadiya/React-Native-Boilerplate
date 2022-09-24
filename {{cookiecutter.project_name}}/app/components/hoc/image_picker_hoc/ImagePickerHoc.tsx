import React from 'react';
import { useTheme } from 'rn-custom-style-sheet';

import { StringConst } from '@constants';
import { useImageSelection } from '@hooks';
import { ImageSelectionOther } from '@models';

import { BottomSheet } from '../../bottom_sheet';
import { ImagePicker } from '../../common';

import styleSheet from './ImagePickerStyles';

import type { BottomSheetHandleType } from '../../bottom_sheet';
import type { ListRenderItemInfo } from 'react-native';

/* Creating a ref object for the bottom sheet. */
export const imagePickerBottomSheetRef: React.RefObject<BottomSheetHandleType> =
  React.createRef<BottomSheetHandleType>();

/**
 * It takes a component as an argument and returns a new component that wraps the original component
 * with the image picker
 * @param Component - React.ComponentType<T>
 * @returns {React.ReactElement} A React Element.
 */
export default function withImagePicker<T>(Component: React.ComponentType<T>): (props: T) => React.ReactElement {
  return function ImagePickerWrapper(props: T): React.ReactElement {
    const { styles } = useTheme(styleSheet);
    const [source, handleTakePhoto, handleChooseLibrary] = useImageSelection<ImageSelectionOther>(false);
    return (
      <>
        <Component {...props} source={source} />
        <BottomSheet<string>
          ref={imagePickerBottomSheetRef}
          title={StringConst.Components.textSelectAPhoto}
          data={StringConst.Components.listSelectAPhoto}
          renderItem={({ item }: ListRenderItemInfo<string>) => (
            <ImagePicker
              item={item}
              bottomSheetRef={imagePickerBottomSheetRef}
              handleTakePhoto={handleTakePhoto}
              handleChooseLibrary={handleChooseLibrary}
            />
          )}
          style={styles.listContainer}
          keyExtractor={(item: string) => item}
        />
      </>
    );
  };
}
