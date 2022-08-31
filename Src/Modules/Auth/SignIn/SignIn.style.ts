import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Fonts } from '@assets';
import { ApplicationStyles, Colors } from '@themes';
import { colorOpacity } from '@utils';
import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option?: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      ...ApplicationStyles.viewStyle,
      ...ApplicationStyles.textStyle,
      ...ApplicationStyles.buttonStyle,
      screenView: {
        backgroundColor: Colors.white,
        backgroundColorDark: Colors.primary
      },
      logo: {
        height: '38@s',
        width: '115@s',
        marginTop: '-84@vs',
        marginBottom: '18@vs',
        tintColor: Colors.primary,
        tintColorDark: Colors.white
      },
      logoSvg: {
        resizeMode: 'contain'
      },
      headerLeftImage: {
        color: Colors.primary,
        colorDark: Colors.white,
        height: '22@ms',
        width: '22@ms',
        marginLeft: '8@s',
        marginRight: '16@s'
      },
      fabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '12@vs'
      },
      fabButton: {
        borderRadius: '20@s',
        backgroundColor: Colors.primary,
        backgroundColorDark: Colors.white
      },
      fabText: {
        fontSize: '16@ms',
        marginLeft: '8@s',
        fontFamily: Fonts.regular,
        color: Colors.white,
        colorDark: Colors.primary
      },
      icon: {
        width: '22@s',
        height: '22@s',
        tintColor: Colors.white,
        tintColorDark: Colors.primary
      },
      orText: {
        marginTop: '12@vs'
      },
      textPolicyDesc: {
        fontFamily: Fonts.regular,
        fontSize: '14@ms',
        textAlign: 'center',
        color: colorOpacity(Colors.primary, 0.3),
        colorDark: colorOpacity(Colors.white, 0.3)
      },
      policyDescContainer: {
        borderWidth: 0,
        borderRadius: 0,
        marginTop: '6@vs',
        marginHorizontal: '20@s',
        paddingHorizontal: '0@s'
      },
      textInput: {
        flex: 1,
        fontFamily: Fonts.regular,
        fontSize: '16@ms',
        paddingVertical: 0,
        borderBottomWidth: 0
      }
    },
    option
  );
}
