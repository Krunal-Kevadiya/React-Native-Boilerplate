import React from 'react';
import { AppRegistry, LogBox, Text, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import 'reflect-metadata';
import { name as appName } from './app.json';
import App from './app/App';

// @ts-ignore
Text.defaultProps = Text.defaultProps ?? {};
// @ts-ignore
Text.defaultProps.allowFontScaling = false;
// @ts-ignore
TextInput.defaultProps = TextInput.defaultProps ?? {};
// @ts-ignore
TextInput.defaultProps.allowFontScaling = false;

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs([
  'EventEmitter.removeListener',
  'Require cycle:',
  'Non-serializable values were found in the navigation state. Check',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components"
]);

/**
 * Entry point of react native app
 * @param {boolean} isHeadless App has been launched in the background by iOS, ignore
 * @returns
 */
/* eslint-disable-next-line react/prop-types, require-jsdoc */
const HeadlessCheck = ({ isHeadless }) => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);
