import React from 'react';
import type { BottomSheetHandleType } from '../../bottom_sheet';

export type ImagePickerPropsType = Required<{
  item: string;
  bottomSheetRef: React.RefObject<BottomSheetHandleType>;
  handleTakePhoto: () => void;
  handleChooseLibrary: () => void;
}>;
