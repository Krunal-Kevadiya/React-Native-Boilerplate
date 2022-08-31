import { CustomStyleSheet } from 'rn-custom-style-sheet';
import { Colors } from '@themes';
import type { StyleSheetOption } from 'rn-custom-style-sheet';

export default function styleSheet(option?: StyleSheetOption) {
  return CustomStyleSheet.create(
    {
      container: {
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        paddingHorizontal: '10@s',
        paddingVertical: '8@s',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        backgroundColorDark: Colors.primary
      },
      textHeader: {
        flex: 1,
        fontSize: '16@ms',
        color: Colors.primary,
        colorDark: Colors.white
      },
      buttonView: {
        marginLeft: '5@s',
        borderRadius: '5@ms',
        paddingHorizontal: '8@s',
        paddingVertical: '8@s',
        backgroundColor: Colors.primary,
        backgroundColorDark: Colors.white
      },
      textButton: {
        fontSize: '12@ms',
        color: Colors.white,
        colorDark: Colors.primary
      }
    },
    option
  );
}
