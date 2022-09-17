import { CustomStyleSheet } from 'rn-custom-style-sheet';

import { ApplicationStyles, Colors } from '@themes';

import type { StyleSheetOption } from 'rn-custom-style-sheet';

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} option - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      ...ApplicationStyles.viewStyle,
      screenView: {
        backgroundColor: Colors[option.theme]?.white
      }
    },
    option
  );
}
