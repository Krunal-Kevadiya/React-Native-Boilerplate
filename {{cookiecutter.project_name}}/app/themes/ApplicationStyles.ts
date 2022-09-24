import { StyleSheet } from 'react-native';
import { Fonts } from '@assets';
import { colorOpacity } from '@utils';
import Colors from './Colors';
import { isIos } from './Metrics';
import type { StyleSheetOption } from 'rn-custom-style-sheet';

const viewStyle = StyleSheet.create({
  centerAlign: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexColumn: {
    flexDirection: 'column'
  },
  flexRow: {
    flexDirection: 'row'
  },
  screen: {
    flex: 1
  }
});

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} option - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
const lineStyle = (option: StyleSheetOption) => ({
  bottomLine: {
    borderBottomWidth: '0.8@s',
    borderBottomColor: colorOpacity(Colors[option.theme]?.black, 0.3)
  },
  normalLine: {
    height: '0.8@s',
    width: '100%',
    backgroundColor: colorOpacity(Colors[option.theme]?.black, 0.2)
  }
});

const textStyle = {};

const buttonStyle = {
  buttonBorderStyle: {
    borderRadius: '5@s',
    borderStyle: 'solid',
    borderWidth: '2@s'
  },
  buttonBottomMargin: {
    marginBottom: isIos ? '40@vs' : '35@vs'
  },
  buttonContainer: {
    flex: 0,
    zIndex: 0
  },
  buttonTopMargin: {
    marginTop: '15@vs'
  },
  spinnerButton: {
    borderRadius: isIos ? '40@s' : '50@s',
    height: isIos ? '40@s' : '50@s',
    width: '90@wp'
  },
  textLabel: {
    fontFamily: Fonts.semibold,
    fontSize: '14@ms'
  }
};

/**
 * A StyleSheet object that contains all of the application's styles.
 * @param {ThemeMode} theme - The theme of the application.
 * @returns {StyleSheet} - A StyleSheet object containing all of the application's styles.
 */
const ApplicationStyles = {
  viewStyle,
  lineStyle,
  buttonStyle,
  textStyle
};

export default ApplicationStyles;
