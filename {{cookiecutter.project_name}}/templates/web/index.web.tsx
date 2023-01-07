import { AppRegistry, LogBox } from 'react-native';
import 'react-native-gesture-handler';
import 'reflect-metadata';
import { name as appName } from './app.json';
import App from './app/App';
{% if cookiecutter.state_management == 'saga' -%}
// @ts-ignore
import { AppConst } from './app/constants';
{% endif -%}
import "./index.scss";

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

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('app-root')
});
