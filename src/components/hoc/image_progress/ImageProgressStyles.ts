import { StyleSheet } from 'react-native';

/**
 * Create a custom style sheet for the given theme.
 * @returns A custom style sheet that can be injected into the component.
 */
export default StyleSheet.create({
  centered: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
