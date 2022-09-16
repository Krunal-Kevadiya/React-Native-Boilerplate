import { useCallback, useState } from 'react';
import { openCamera, openPicker } from 'react-native-image-crop-picker';

import { bottomSheetRef, ToastHolder } from '@components';
import { ImageSelectionOther } from '@models';

import type { Options } from 'react-native-image-crop-picker';

function getFileNameWithExtension(url: string): string {
  return url.substring(url.lastIndexOf('/') + 1, url.length);
}

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
        bottomSheetRef?.current?.hide();
      })
      .catch((error: Error) => {
        bottomSheetRef?.current?.hide();
        ToastHolder.toastMessage(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChooseLibrary = useCallback<() => void>(() => {
    openPicker(options)
      .then((image) => {
        setSource(ImageSelectionOther.empty(image.path, getFileNameWithExtension(image.path), image.data) as T);
        bottomSheetRef?.current?.hide();
      })
      .catch((error: Error) => {
        bottomSheetRef?.current?.hide();
        ToastHolder.toastMessage(error.message);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [source, handleTakePhoto, handleChooseLibrary];
}
