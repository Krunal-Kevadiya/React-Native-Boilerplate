import { CustomStyleSheet, type StyleSheetOption } from 'rn-custom-style-sheet';
import { Fonts } from '@assets';
import { Colors } from '@themes';

/**
 * A StyleSheet object that contains all of the toast component styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the toast component styles.
 */
export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      absoluteView: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: '60@ms',
        top: 0
      },
      bubblesImage: {
        borderBottomLeftRadius: '10@ms',
        bottom: -1,
        height: '52@ms',
        left: 0,
        position: 'absolute',
        resizeMode: 'contain',
        width: '52@ms',
        overflow: 'hidden'
      },
      chatBubblesCloseImage: {
        height: '16@ms',
        marginBottom: '3@vs',
        resizeMode: 'contain',
        width: '16@ms',
        tintColor: Colors[option.theme]?.white
      },
      chatBubblesImage: {
        bottom: 0,
        height: '42@ms',
        left: 0,
        position: 'absolute',
        resizeMode: 'contain',
        right: 0,
        top: 0,
        width: '42@ms'
      },
      chatBubblesTouchView: {
        height: '42@ms',
        position: 'absolute',
        right: '5@ms',
        top: '-21@ms',
        width: '42@ms'
      },
      chatBubblesView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
      },
      contentContainerStyle: {
        alignItems: 'center',
        borderRadius: '10@ms',
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: '15@s',
        minHeight: '70@vs',
        paddingHorizontal: '15@s'
      },
      contentStyle: {
        flex: 1,
        paddingRight: '5@s'
      },
      imageStyle: {
        height: '24@ms',
        resizeMode: 'contain',
        width: '24@ms'
      },
      messageStyle: {
        color: Colors[option.theme]?.white,
        fontFamily: Fonts.regular,
        fontSize: '14@ms'
      },
      tintColor: {
        tintColor: Colors[option.theme]?.white
      },
      titleStyle: {
        color: Colors[option.theme]?.white,
        fontFamily: Fonts.semibold,
        fontSize: '18@ms'
      }
    },
    option
  );
}
