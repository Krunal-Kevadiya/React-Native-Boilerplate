import { CustomStyleSheet, type StyleSheetOption } from 'rn-custom-style-sheet';
import { Fonts } from '@assets';
import { ApplicationStyles, Colors } from '@themes';
import { colorOpacity } from '@utils';

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} option - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      ...ApplicationStyles.viewStyle,
      ...ApplicationStyles.textStyle,
      ...ApplicationStyles.buttonStyle,
      screenView: {
        backgroundColor: Colors[option.themeMode]?.invertedWhite
      },
      logo: {
        height: '38@s',
        width: '115@s',
        marginTop: '-84@vs',
        marginBottom: '18@vs',
        tintColor: Colors[option.themeMode]?.invertedBlack
      },
      logoSvg: {
        resizeMode: 'contain'
      },
      headerLeftImage: {
        color: Colors[option.themeMode]?.invertedBlack,
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
        backgroundColor: Colors[option.themeMode]?.invertedBlack
      },
      fabText: {
        fontSize: '16@ms',
        marginLeft: '8@s',
        fontFamily: Fonts.regular,
        color: Colors[option.themeMode]?.invertedWhite
      },
      icon: {
        width: '22@s',
        height: '22@s',
        tintColor: Colors[option.themeMode]?.invertedWhite
      },
      orText: {
        marginTop: '12@vs'
      },
      textPolicyDesc: {
        fontFamily: Fonts.regular,
        fontSize: '14@ms',
        textAlign: 'center',
        color: colorOpacity(Colors[option.themeMode]?.invertedBlack, 0.3)
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
