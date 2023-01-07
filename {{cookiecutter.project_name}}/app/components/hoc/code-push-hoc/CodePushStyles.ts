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
      container: {
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        paddingHorizontal: '10@s',
        paddingVertical: '8@s',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors[option.theme]?.invertedBlack
      },
      textHeader: {
        flex: 1,
        fontSize: '16@ms',
        color: Colors[option.theme]?.invertedWhite
      },
      buttonView: {
        marginLeft: '5@s',
        borderRadius: '5@ms',
        paddingHorizontal: '8@s',
        paddingVertical: '8@s',
        backgroundColor: Colors[option.theme]?.invertedWhite
      },
      textButton: {
        fontSize: '12@ms',
        color: Colors[option.theme]?.invertedBlack
      }
    },
    option
  );
}
