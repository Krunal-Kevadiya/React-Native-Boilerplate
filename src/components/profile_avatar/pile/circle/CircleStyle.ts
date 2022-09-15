import { CustomStyleSheet } from 'rn-custom-style-sheet';

import { Colors } from '@themes';

import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      overflow: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      overflowLabel: {
        fontSize: '14@ms',
        fontWeight: 'bold',
        letterSpacing: -1,
        color: Colors[option.theme]?.white
      },
      container: {
        backgroundColor: Colors[option.theme]?.secondary
      }
    },
    option
  );
}
