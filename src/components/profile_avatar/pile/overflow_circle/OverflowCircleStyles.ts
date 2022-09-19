import { CustomStyleSheet } from 'rn-custom-style-sheet';

import { Colors } from '@themes';

import type { StyleSheetOption } from 'rn-custom-style-sheet';

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} option - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      overflow: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors[option.theme]?.white
      },
      overflowLabel: {
        fontSize: '14@ms',
        fontWeight: 'bold',
        letterSpacing: -1,
        color: Colors[option.theme]?.black
      }
    },
    option
  );
}