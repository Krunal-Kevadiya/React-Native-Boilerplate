import React from 'react';
import { useTheme } from 'rn-custom-style-sheet';

import { StringConst } from '@constants';
import { useImageSelection } from '@hooks';
import { ImageSelectionOther } from '@models';

import { BottomSheet } from '../../bottom_sheet';
import { ImagePicker } from '../../common';

import styleSheet from './ImagePickerStyle';

import type { BottomSheetHandleType } from '../../bottom_sheet';
import type { ListRenderItemInfo } from 'react-native';

export const bottomSheetRef: React.RefObject<BottomSheetHandleType> = React.createRef<BottomSheetHandleType>();

export default function withImagePicker<T>(Component: React.ComponentType<T>): (props: T) => React.ReactElement {
  return function ImagePickerWrapper(props: T): React.ReactElement {
    const { styles } = useTheme(styleSheet);
    const [source, handleTakePhoto, handleChooseLibrary] = useImageSelection<ImageSelectionOther>(false);
    return (
      <>
        <Component {...props} source={source} />
        <BottomSheet<string>
          ref={bottomSheetRef}
          title={StringConst.imagePicker.textSelectAPhoto}
          data={StringConst.imagePicker.listSelectAPhoto}
          renderItem={({ item }: ListRenderItemInfo<string>) => (
            <ImagePicker
              item={item}
              bottomSheetRef={bottomSheetRef}
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
