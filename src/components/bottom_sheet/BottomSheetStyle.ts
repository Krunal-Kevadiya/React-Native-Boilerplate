import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import { colorOpacity } from '@utils';
import type { StyleSheetOption } from 'rn-custom-style-sheet';

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
        backgroundColorDark: colorOpacity(Colors.white, 0.1),
        backgroundColor: colorOpacity(Colors.primary, 0.99)
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
        color: Colors.primary,
        colorDark: Colors.white
      },
      popupContainerStyle: {
        alignItems: 'center',
        borderTopLeftRadius: '15@s',
        borderTopRightRadius: '15@s',
        paddingTop: '20@vs',
        width: '100%',
        backgroundColor: Colors.white,
        backgroundColorDark: Colors.primary
      },
      popupDismissLine: {
        alignSelf: 'center',
        borderRadius: '2.5@s',
        height: '5@s',
        marginBottom: '15@vs',
        opacity: 0.5,
        width: '55@s',
        backgroundColor: Colors.primary,
        backgroundColorDark: Colors.white
      },
      popupStyle: {
        alignItems: 'flex-end',
        height: '93%',
        justifyContent: 'flex-end',
        width: '100%',
        backgroundColor: Colors.transparentBlack
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
        color: Colors.primary,
        colorDark: Colors.white
      }
    },
    option
  );
}
