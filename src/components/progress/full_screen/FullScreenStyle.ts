import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Colors, ApplicationStyles } from '@themes';
import { colorOpacity } from '@utils';
import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      ...ApplicationStyles.viewStyle,
      containerStyle: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: colorOpacity(Colors.white, 0.9),
        backgroundColorDark: colorOpacity(Colors.primary, 0.9)
      }
    },
    option
  );
}
