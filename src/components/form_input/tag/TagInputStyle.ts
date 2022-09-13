import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Fonts } from '@assets';
import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      blockquote: {
        borderLeftWidth: '4@s',
        marginLeft: '5@s',
        paddingHorizontal: '5@s'
      },
      italic: {
        fontStyle: 'italic'
      },
      email: {
        fontFamily: Fonts.bold,
        padding: '5@s'
      },
      hashtag: {
        fontFamily: Fonts.italic,
        padding: '5@s'
      },
      phone: {
        fontFamily: Fonts.medium
      },
      strikethrough: {
        textDecorationLine: 'line-through'
      },
      underline: {
        textDecorationLine: 'underline'
      },
      bold: {
        fontWeight: 'bold'
      },
      url: {
        fontFamily: Fonts.medium,
        padding: '5@s'
      },
      username: {
        fontFamily: Fonts.boldItalic,
        padding: '5@s'
      },
      placeholder: {
        height: '80@s'
      }
    },
    option
  );
}
