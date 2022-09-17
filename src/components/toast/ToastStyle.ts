import { CustomStyleSheet } from 'rn-custom-style-sheet';

import { Colors } from '@themes';

import type { StyleSheetOption } from 'rn-custom-style-sheet';

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} option - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      absoluteView: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
      },
      contentContainerStyle: {
        alignItems: 'center',
        borderRadius: '10@s',
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: '15@s',
        minHeight: '70@vs',
        paddingHorizontal: '15@s',
        backgroundColor: Colors[option.theme]?.secondary
      },
      imageStyle: {
        height: '24@ms',
        resizeMode: 'contain',
        width: '24@ms'
      },
      messageStyle: {
        flex: 1,
        fontSize: '14@ms',
        paddingRight: '5@s',
        textAlign: 'center',
        color: Colors[option.theme]?.black
      },
      tintColor: {
        tintColor: Colors[option.theme]?.black
      }
    },
    option
  );
}
