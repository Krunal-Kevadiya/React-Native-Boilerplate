import { CustomStyleSheet, type StyleSheetOption } from 'rn-custom-style-sheet';
import { Colors, ApplicationStyles } from '@themes';
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
      closeImage: {
        height: '20@ms',
        tintColor: Colors[option.theme]?.invertedBlack,
        width: '20@ms'
      },
      containerViewStyle: {
        alignItems: 'center',
        width: '100%'
      },
      customBackdrop: {
        flex: 1,
        backgroundColorDark: colorOpacity(Colors[option.theme]?.black, 0.1),
        backgroundColor: colorOpacity(Colors[option.theme]?.black, 0.99)
      },
      headerContainer: {
        marginBottom: '10@vs',
        paddingHorizontal: '24@s',
        width: '100%'
      },
      headerTextContainer: {
        marginBottom: '5@vs',
        marginTop: '10@vs'
      },
      list: {
        width: '100%'
      },
      listMargin: {
        marginBottom: '25@vs'
      },
      messageText: {
        width: '100%',
        fontSize: '13@ms',
        marginTop: '5@vs',
        paddingHorizontal: '20@s',
        color: Colors[option.theme]?.invertedBlack
      },
      popupContainerStyle: {
        alignItems: 'center',
        borderTopLeftRadius: '15@s',
        borderTopRightRadius: '15@s',
        paddingTop: '20@vs',
        width: '100%',
        backgroundColor: Colors[option.theme]?.invertedWhite
      },
      popupDismissLine: {
        alignSelf: 'center',
        borderRadius: '2.5@s',
        height: '5@s',
        marginBottom: '15@vs',
        opacity: 0.5,
        width: '55@s',
        backgroundColor: Colors[option.theme]?.invertedBlack
      },
      popupStyle: {
        alignItems: 'flex-end',
        height: '93%',
        justifyContent: 'flex-end',
        width: '100%',
        backgroundColor: Colors[option.theme]?.invertedTransparentBlack
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
        paddingLeft: '10@s',
        paddingRight: '20@s',
        color: Colors[option.theme]?.invertedBlack
      }
    },
    option
  );
}
