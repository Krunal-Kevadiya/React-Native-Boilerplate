import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      absoluteView: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
      },
      contentContainerStyle: {
        alignItems: 'center',
        borderRadius: '10@s',
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: '15@s',
        minHeight: '70@vs',
        paddingHorizontal: '15@s',
        backgroundColor: Colors.secondary
      },
      imageStyle: {
        height: '24@ms',
        resizeMode: 'contain',
        width: '24@ms'
      },
      messageStyle: {
        flex: 1,
        fontSize: '14@ms',
        paddingRight: '5@s',
        textAlign: 'center',
        color: Colors.primary
      },
      tintColor: {
        tintColor: Colors.primary
      }
    },
    option
  );
}
