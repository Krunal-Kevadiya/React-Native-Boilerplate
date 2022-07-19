import React from 'react';
import type { BottomSheetHandleType } from '../../BottomSheet';

export type ImagePickerType = Required<{
  item: string;
  bottomSheetRef: React.RefObject<BottomSheetHandleType>;
  handleTakePhoto: () => void;
  handleChooseLibrary: () => void;
}>;
