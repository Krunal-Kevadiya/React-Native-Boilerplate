import { CustomStyleSheet } from 'rn-custom-style-sheet';

import { Fonts } from '@assets';
import { ApplicationStyles, Colors } from '@themes';
import { colorOpacity } from '@utils';

import type { StyleSheetOption } from 'rn-custom-style-sheet';

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} option - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      ...ApplicationStyles.lineStyle(option),
      errorMsg: {
        fontFamily: Fonts.regular,
        fontSize: '14@ms',
        marginLeft: '15@s'
      },
      container: {
        flexDirection: 'column',
        width: '100%'
      },
      inputContainer: {
        flexDirection: 'row',
        minHeight: '40@vs',
        paddingHorizontal: '20@s',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20@ms',
        borderWidth: 1,
        borderColor: colorOpacity(Colors[option.theme]?.black, 0.2)
      },
      inputContainerActive: {
        borderColor: colorOpacity(Colors[option.theme]?.black, 0.4)
      },
      inputContainerError: {
        borderColor: Colors[option.theme]?.red
      },
      textLabel: {
        fontFamily: Fonts.semibold,
        fontSize: '14@ms',
        marginRight: '12@s',
        color: Colors[option.theme]?.black
      },
      input: {
        flex: 1,
        fontFamily: Fonts.regular,
        fontSize: '14@ms',
        padding: 0,
        color: Colors[option.theme]?.black
      },
      foregroundColor: {
        color: Colors[option.theme]?.black
      }
    },
    option
  );
}
