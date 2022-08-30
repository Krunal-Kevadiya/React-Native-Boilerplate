import { CustomStyleSheet } from 'rn-custom-style-sheet';
import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      listContainer: {
        paddingHorizontal: '20@s'
      }
    },
    option
  );
}
