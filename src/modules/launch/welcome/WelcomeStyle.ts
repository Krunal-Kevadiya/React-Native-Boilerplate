import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { ApplicationStyles, Colors } from '@themes';
import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      ...ApplicationStyles.viewStyle,
      screenView: {
        backgroundColor: Colors.white,
        backgroundColorDark: Colors.primary
      }
    },
    option
  );
}
