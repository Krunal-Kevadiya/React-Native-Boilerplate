import { CustomStyleSheet } from 'rn-custom-style-sheet';

import { Colors } from '@themes';

import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      actionSheetItem: {
        fontSize: '18@ms',
        paddingVertical: '10@vs',
        color: Colors[option.theme]?.black
      }
    },
    option
  );
}
