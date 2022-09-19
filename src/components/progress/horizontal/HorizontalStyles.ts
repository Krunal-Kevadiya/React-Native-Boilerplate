import { StyleSheet } from 'react-native';

import { ApplicationStyles } from '@themes';

/**
 * Create a custom style sheet for the given theme.
 * @returns A custom style sheet that can be injected into the component.
 */
export default StyleSheet.create({
  ...ApplicationStyles.viewStyle,
  containerStyle: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }
});
