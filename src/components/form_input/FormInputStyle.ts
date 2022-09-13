import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Fonts } from '@assets';
import { ApplicationStyles, Colors } from '@themes';
import { colorOpacity } from '@utils';
import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      ...ApplicationStyles.lineStyle,
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
        borderColor: colorOpacity(Colors.primary, 0.2),
        borderColorDark: colorOpacity(Colors.white, 0.2)
      },
      inputContainerActive: {
        borderColor: colorOpacity(Colors.primary, 0.4),
        borderColorDark: colorOpacity(Colors.white, 0.4)
      },
      inputContainerError: {
        borderColor: Colors.red,
        borderColorDark: Colors.red
      },
      textLabel: {
        fontFamily: Fonts.semibold,
        fontSize: '14@ms',
        marginRight: '12@s',
        color: Colors.primary,
        colorDark: Colors.white
      },
      input: {
        flex: 1,
        fontFamily: Fonts.regular,
        fontSize: '14@ms',
        padding: 0,
        color: Colors.primary,
        colorDark: Colors.white
      },
      foregroundColor: {
        color: Colors.primary,
        colorDark: Colors.white
      }
    },
    option
  );
}
