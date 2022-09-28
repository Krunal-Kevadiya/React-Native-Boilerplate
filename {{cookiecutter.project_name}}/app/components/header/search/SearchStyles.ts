import { CustomStyleSheet, type StyleSheetOption } from 'rn-custom-style-sheet';
import { ApplicationStyles, Colors } from '@themes';

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} option - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      ...ApplicationStyles.lineStyle(option),
      centerSide: {
        bottom: 0,
        height: '40@s',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
      },
      container: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: '12@vs'
      },
      inputSearch: {
        flex: 1,
        fontSize: '16@ms',
        paddingHorizontal: '10@s',
        paddingVertical: 0,
        borderBottomWidth: 0
      },
      searchContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '10@s'
      },
      textLabel: {
        fontSize: '16@ms',
        paddingHorizontal: '5@s',
        paddingVertical: '5@vs',
        color: Colors[option.theme]?.black
      },
      imageSearch: {
        tintColor: Colors[option.theme]?.black
      }
    },
    option
  );
}
