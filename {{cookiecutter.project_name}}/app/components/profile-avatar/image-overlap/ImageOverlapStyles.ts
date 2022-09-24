import { CustomStyleSheet, type StyleSheetOption } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import { colorOpacity } from '@utils';

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} option - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      imageOverlap: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: colorOpacity(Colors[option.theme]?.white, 0.2)
      },
      svgColor: {
        color: Colors[option.theme]?.black
      }
    },
    option
  );
}
