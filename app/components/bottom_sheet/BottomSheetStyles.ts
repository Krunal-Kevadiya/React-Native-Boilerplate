import { CustomStyleSheet } from 'rn-custom-style-sheet';

import { Colors } from '@themes';
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
      containerViewStyle: {
        alignItems: 'center',
        marginBottom: '20@vs',
        width: '100%'
      },
      customBackdrop: {
        flex: 1,
        backgroundColorDark: colorOpacity(Colors[option.theme]?.white, 0.1),
        backgroundColor: colorOpacity(Colors[option.theme]?.black, 0.99)
      },
      list: {
        width: '100%'
      },
      listMargin: {
        marginBottom: '40@vs'
      },
      messageText: {
        fontSize: '12@ms',
        marginBottom: '10@vs',
        paddingHorizontal: '20@s',
        textAlign: 'center',
        color: Colors[option.theme]?.black
      },
      popupContainerStyle: {
        alignItems: 'center',
        borderTopLeftRadius: '15@s',
        borderTopRightRadius: '15@s',
        paddingTop: '20@vs',
        width: '100%',
        backgroundColor: Colors[option.theme]?.white
      },
      popupDismissLine: {
        alignSelf: 'center',
        borderRadius: '2.5@s',
        height: '5@s',
        marginBottom: '15@vs',
        opacity: 0.5,
        width: '55@s',
        backgroundColor: Colors[option.theme]?.black
      },
      popupStyle: {
        alignItems: 'flex-end',
        height: '93%',
        justifyContent: 'flex-end',
        width: '100%',
        backgroundColor: Colors[option.theme]?.transparentBlack
      },
      popupView: {
        height: '100%',
        justifyContent: 'flex-end',
        marginHorizontal: 0,
        margin: 0,
        width: '100%',
        zIndex: 1
      },
      titleText: {
        fontSize: '16@ms',
        marginBottom: '10@vs',
        paddingHorizontal: '20@s',
        textAlign: 'center',
        color: Colors[option.theme]?.black
      }
    },
    option
  );
}
