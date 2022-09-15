import { CustomStyleSheet } from 'rn-custom-style-sheet';

import { Colors } from '@themes';

import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      centerSide: {
        left: 0,
        position: 'absolute',
        right: 0
      },
      imageTitle: {
        tintColor: Colors[option.theme]?.black
      },
      centerContainerSide: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      centerImageTitle: {
        alignSelf: 'center'
      },
      textTitle: {
        fontSize: '16@ms',
        color: Colors[option.theme]?.black
      },
      centerTextTitle: {
        textAlign: 'center'
      }
    },
    option
  );
}
