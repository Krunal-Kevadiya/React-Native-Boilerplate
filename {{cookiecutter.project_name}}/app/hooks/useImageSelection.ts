import { useCallback, useState } from 'react';
import { openCamera, openPicker } from 'react-native-image-crop-picker';

import { imagePickerBottomSheetRef, ToastHolder } from '@components';
import { ImageSelectionOther } from '@models';

import type { Options } from 'react-native-image-crop-picker';

/**
 * "Given a URL, return the file name with extension."
 *
 * The function takes a string as an argument and returns a string
 * @param {string} url - The URL of the file you want to download.
 * @returns The file name with extension.
 */
function getFileNameWithExtension(url: string): string {
  return url.substring(url.lastIndexOf('/') + 1, url.length);
}

/**
 * A image picker hook that returns the source of the image, the function to take a photo, and the function to choose a photo from the library.
 * @returns [T | undefined, () => void, () => void] - The source of the image, the function to take a photo, and the function to choose a photo from the library.
 */
export default function useImageSelection<T extends ImageSelectionOther>(
  isAttachment: boolean
): [T | undefined, () => void, () => void] {
  const options: Options = {
    width: isAttachment ? 1500 : 500,
    height: isAttachment ? 1500 : 500,
    mediaType: 'photo',
    forceJpg: true,
    cropping: !isAttachment,
    multiple: false,
    includeBase64: true
  };
  const [source, setSource] = useState<T | undefined>(undefined);

  const handleTakePhoto = useCallback<() => void>(() => {
    openCamera(options)
      .then((image) => {
        setSource(ImageSelectionOther.empty(image.path, getFileNameWithExtension(image.path), image.data) as T);
        imagePickerBottomSheetRef?.current?.hide();
      })
      .catch((error: Error) => {
        imagePickerBottomSheetRef?.current?.hide();
        ToastHolder.toastMessage(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChooseLibrary = useCallback<() => void>(() => {
    openPicker(options)
      .then((image) => {
        setSource(ImageSelectionOther.empty(image.path, getFileNameWithExtension(image.path), image.data) as T);
        imagePickerBottomSheetRef?.current?.hide();
      })
      .catch((error: Error) => {
        imagePickerBottomSheetRef?.current?.hide();
        ToastHolder.toastMessage(error.message);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [source, handleTakePhoto, handleChooseLibrary];
}
