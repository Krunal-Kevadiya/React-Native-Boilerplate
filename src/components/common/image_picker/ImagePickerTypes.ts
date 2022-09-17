import React from 'react';

import type { BottomSheetHandleType } from '../../bottom_sheet';

/**
 * The props for the ImagePicker component.
 * @typedef {Object} ImagePickerPropsType
 * @property {string} item - The item that the image picker is being used for.
 * @property {React.RefObject<BottomSheetHandleType>} bottomSheetRef - The ref of the bottom sheet.
 * @property {() => void} handleTakePhoto - The function to call when the user wants to take a photo.
 * @property {() => void} handleChooseLibrary - The function to call when the user wants to choose a photo from the library.
 */
export type ImagePickerPropsType = Required<{
  item: string;
  bottomSheetRef: React.RefObject<BottomSheetHandleType>;
  handleTakePhoto: () => void;
  handleChooseLibrary: () => void;
}>;
