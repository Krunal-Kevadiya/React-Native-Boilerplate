import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option?: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      imageStyle: {
        tintColor: Colors.gray,
        tintColorDark: Colors.gray
      }
    },
    option
  );
}
