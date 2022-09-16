import { CustomStyleSheet } from 'rn-custom-style-sheet';

import { Fonts } from '@assets';
import { ApplicationStyles, Colors } from '@themes';
import { colorOpacity } from '@utils';

import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      ...ApplicationStyles.viewStyle,
      ...ApplicationStyles.buttonStyle,
      ...ApplicationStyles.lineStyle(option),
      formContainer: {
        width: '100%',
        paddingHorizontal: '20@s'
      },
      textInput: {
        flex: 1,
        fontFamily: Fonts.regular,
        fontSize: '16@ms',
        paddingVertical: 0,
        borderBottomWidth: 0
      },
      textInputContainer: {
        marginTop: '12@vs'
      },
      button: {
        backgroundColor: Colors[option.theme]?.black
      },
      disabledButton: {
        backgroundColor: Colors[option.theme]?.gray
      },
      buttonText: {
        color: Colors[option.theme]?.white
      },
      signUpDescContainer: {
        borderWidth: 0,
        borderRadius: 0,
        marginTop: '6@vs',
        paddingHorizontal: '0@s'
      },
      signUpContainer: {
        borderWidth: 0,
        borderRadius: 0,
        paddingHorizontal: '0@s',
        marginTop: '20@vs'
      },
      textSignInDesc: {
        fontFamily: Fonts.regular,
        fontSize: '14@ms',
        textAlign: 'center',
        color: colorOpacity(Colors[option.theme]?.black, 0.3)
      }
    },
    option
  );
}
