import React from 'react';
import type ImageStaticPropsType from './ImageStaticType';
import { Icon } from '../../icon';

export default function ImageStatic({ image, size, svgStyle }: ImageStaticPropsType): React.ReactElement {
  return <Icon type="svg" size={size} source={image ?? ''} svgStyle={svgStyle} />;
}
