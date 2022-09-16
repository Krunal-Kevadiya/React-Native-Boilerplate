import { StyleSheet } from 'react-native';

import { ApplicationStyles } from '@themes';

export default StyleSheet.create({
  ...ApplicationStyles.viewStyle,
  containerStyle: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }
});
