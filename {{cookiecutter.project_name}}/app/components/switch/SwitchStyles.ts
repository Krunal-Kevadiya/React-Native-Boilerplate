import { CustomStyleSheet, type StyleSheetOption } from 'rn-custom-style-sheet';

export const SwitchWidth: number = 60;

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} option - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
export default function styleSheet(option: StyleSheetOption) {
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
