import React, { useCallback, useState } from 'react';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import { useTheme } from 'rn-custom-style-sheet';
import { Icons } from '@assets';
import { Colors } from '@themes';
import { withImageProgress } from '../../hoc';
import { Icon } from '../../icon';
import styleSheet from './ImageUrlStyles';
import type { ImageUrlPropsType } from './ImageUrlTypes';
import type { LayoutChangeEvent } from 'react-native';

const FastImageProgress = withImageProgress(FastImage);

/**
 * A component that renders an image with a progress indicator.
 * @param {ImageUrlPropsType} props - the props for the component.
 * @returns {React.ReactElement} A React Element.
 */
export default function ImageUrl({ url, style, imageStyle, onLoading }: ImageUrlPropsType): React.ReactElement {
  const [indicatorSize, setIndicatorSize] = useState<number>(0);
  const { styles, theme } = useTheme(styleSheet);

  const handleLayout = useCallback<(event: LayoutChangeEvent) => void>((event) => {
    const { width, height } = event.nativeEvent.layout;
    const minSize: number = Math.min(width, height);
    const size: number = minSize > 40 ? minSize / 3 : minSize;
    setIndicatorSize(size);
  }, []);

  return (
    <FastImageProgress
      style={style}
      imageStyle={imageStyle}
      source={{
        uri: url,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable
      }}
      //@ts-ignore
      indicator={Progress.Circle}
      indicatorProps={{
        size: indicatorSize,
        showsText: true,
        indeterminate: false,
        strokeCap: 'round',
        color: Colors[theme]?.secondary,
        unfilledColor: Colors[theme]?.white,
        borderColor: Colors[theme]?.secondary,
        borderWidth: 2
      }}
      renderError={() => {
        return <Icon type={'svg'} size={indicatorSize} source={Icons.icUser} style={styles.imageStyle} />;
      }}
      resizeMode={FastImage.resizeMode.cover}
      onLayout={handleLayout}
      onLoading={onLoading}
    />
  );
}
