import { CustomStyleSheet } from 'rn-custom-style-sheet';
import type { StyleSheetOption } from 'rn-custom-style-sheet';

export const SwitchWidth: number = 60;

export default function styleSheet(option?: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      circleStyle: {
        borderRadius: '24@ms',
        height: '24@ms',
        width: '24@ms'
      },
      containerStyle: {
        borderRadius: '36.5@s',
        paddingHorizontal: '2@s',
        paddingVertical: '2@vs',
        width: `${SwitchWidth}@s`,
        height: '30@s'
      },
      shadowValue: {
        elevation: '4@s',
        shadowOffset: {
          width: 0,
          height: '2@s'
        },
        shadowOpacity: 0.23,
        shadowRadius: '2.62@s'
      }
    },
    option
  );
}
