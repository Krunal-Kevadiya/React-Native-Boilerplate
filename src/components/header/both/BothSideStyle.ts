import { CustomStyleSheet } from 'rn-custom-style-sheet';

import { Colors } from '@themes';

import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      addMargin: {
        marginHorizontal: '10@s'
      },
      bothSide: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      textLabel: {
        fontSize: '16@ms',
        color: Colors[option.theme]?.black
      }
    },
    option
  );
}
