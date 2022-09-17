import React from 'react';

import { Icon } from '../../icon';

import type ImageStaticPropsType from './ImageStaticTypes';

/**
 * A component that renders an image from a static image file.
 * @param {ImageStaticPropsType} props - The props for the component.
 * @returns {React.ReactElement} A React Element.
 */
export default function ImageStatic({ image, size, svgStyle }: ImageStaticPropsType): React.ReactElement {
  return <Icon type="svg" size={size} source={image ?? ''} svgStyle={svgStyle} />;
}
