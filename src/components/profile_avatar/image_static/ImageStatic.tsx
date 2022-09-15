import React from 'react';

import { Icon } from '../../icon';

import type ImageStaticPropsType from './ImageStaticTypes';

export default function ImageStatic({ image, size, svgStyle }: ImageStaticPropsType): React.ReactElement {
  return <Icon type="svg" size={size} source={image ?? ''} svgStyle={svgStyle} />;
}
