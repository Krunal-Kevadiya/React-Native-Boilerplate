import { CustomStyleSheet } from 'rn-custom-style-sheet';

import { Colors, ApplicationStyles } from '@themes';

import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      ...ApplicationStyles.lineStyle(option),
      subContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      container: {
        width: '100%',
        backgroundColor: Colors[option.theme]?.white
      },
      rightView: {
        flexDirection: 'row'
      }
    },
    option
  );
}
