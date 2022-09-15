import { CustomStyleSheet } from 'rn-custom-style-sheet';

import { Colors } from '@themes';

import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      container: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
        zIndex: 10
      },
      buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        shadowOffset: { width: '2@s', height: '2@s' },
        shadowOpacity: 5.0,
        shadowRadius: '2@s',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors[option.theme]?.secondary,
        shadowColor: Colors[option.theme]?.gray
      }
    },
    option
  );
}
