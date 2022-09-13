import React from 'react';
import { AppRegistry, LogBox, Text, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import 'reflect-metadata';
import { name as appName } from './app.json';
import App from './src/App';

Text.defaultProps = Text.defaultProps ?? {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps ?? {};
TextInput.defaultProps.allowFontScaling = false;

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs([
  'EventEmitter.removeListener',
  'Require cycle:',
  'Non-serializable values were found in the navigation state. Check',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components"
]);

const HeadlessCheck = ({ isHeadless }) => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);
