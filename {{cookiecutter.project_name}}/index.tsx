import React from 'react';
import { AppRegistry, LogBox, Text, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import 'reflect-metadata';
import { name as appName } from './app.json';
import App from './app/App';
{% if cookiecutter.state_management == 'saga' -%}
// @ts-ignore
import { AppConst } from './app/constants';
{% endif -%}

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

{% if cookiecutter.state_management == 'saga' -%}
if (AppConst.isDevelopment) {
  import('./app/configs/ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
{% endif -%}

const HeadlessCheck = ({ isHeadless }: { isHeadless: boolean }) => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);
