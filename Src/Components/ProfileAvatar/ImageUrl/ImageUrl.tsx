import React, { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import { useTheme } from 'rn-custom-style-sheet';
import { Icons } from '@assets';
import { Colors } from '@themes';
import type { ImageUrlPropsType } from './ImageUrl.type';
import { withImageProgress } from '../../Hoc';
import { Icon } from '../../Icon';
import styleSheet from './ImageUrl.style';

const FastImageProgress = withImageProgress(FastImage);

export default function ImageUrl({ url, style, imageStyle, onLoading }: ImageUrlPropsType): React.ReactElement {
  const [indicatorSize, setIndicatorSize] = useState<number>(0);
  const styles = useTheme(styleSheet);

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
        color: Colors.secondary,
        unfilledColor: Colors.white,
        borderColor: Colors.secondary,
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
