import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'rn-custom-style-sheet';
import {
  withCodePush,
  Toast,
  ToastHolder,
  FullScreenProgress,
  FullScreenProgressHolder,
  HorizontalProgress,
  HorizontalProgressHolder
} from '@components';
import { AppConst } from '@constants';
import { useTranslationsLanguage, useLifecycle } from '@hooks';
import { AppNavigator } from '@navigators';
import { Store } from '@stores';
import { ApplicationStyles } from '@themes';
import { changeScreenOrientation, getStorageString, setStorageString } from '@utils';

/**
 * The main App component.
 * We're using the Provider component from react-redux to wrap our AppNavigator component, which is the
 * component that contains all of our routes
 * @returns The App component is being returned
 */
function App(): React.ReactElement {
  useTranslationsLanguage();

  useLifecycle(
    () => {
      changeScreenOrientation(true);
    },
    () => {
      ToastHolder.clearToast();
      FullScreenProgressHolder.clearFullScreenProgress();
      HorizontalProgressHolder.clearHorizontalProgress();
    }
  );

  return (
    <GestureHandlerRootView style={ApplicationStyles.viewStyle.screen}>
      <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
          <ThemeProvider getStorageString={getStorageString} setStorageString={setStorageString}>
            <SafeAreaProvider style={ApplicationStyles.viewStyle.screen}>
              <StatusBar animated hidden={false} />
              <AppNavigator />
              <Toast translucent numberOfLines={2} toastPosition={'bottom'} ref={(ref) => ToastHolder.setToast(ref)} />
              <FullScreenProgress ref={(ref) => FullScreenProgressHolder.setFullScreenProgress(ref)} />
              <HorizontalProgress ref={(ref) => HorizontalProgressHolder.setHorizontalProgress(ref)} />
            </SafeAreaProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default AppConst.isDevelopment ? App : withCodePush(App);
