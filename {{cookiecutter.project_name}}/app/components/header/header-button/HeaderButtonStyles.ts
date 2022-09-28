import { CustomStyleSheet, type StyleSheetOption } from 'rn-custom-style-sheet';
import { Colors } from '@themes';

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} option - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      centerView: {
        left: 0,
        position: 'absolute',
        right: 0,
        flexDirection: 'row'
      },
      image: {
        tintColor: Colors[option.theme]?.black
      },
      centerImage: {
        alignSelf: 'center'
      },
      centerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      text: {
        fontSize: '16@ms',
        color: Colors[option.theme]?.black
      },
      centerText: {
        textAlign: 'center'
      },
      addMargin: {
        marginHorizontal: '10@s'
      }
    },
    option
  );
}
