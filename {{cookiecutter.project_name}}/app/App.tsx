import React {% if cookiecutter.state_management == "graphql" -%}, { useState, useEffect } {% endif -%} from 'react';
import { StatusBar {% if cookiecutter.state_management == "graphql" -%},ActivityIndicator, StyleSheet, View {% endif -%} } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
import { ApplicationStyles } from '@themes';
import { changeScreenOrientation, getStorageString, setStorageString } from '@utils';
{% if cookiecutter.state_management != 'graphql' -%}
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store } from '@redux';
{% elif cookiecutter.state_management == "graphql" -%}
import isNil from 'lodash/isNil';
import { ApolloProvider } from '@apollo/client';
import { persistor, client, initApolloClient } from './configs';
{% endif -%}

/**
 * The main App component.
 * We're using the Provider component from react-redux to wrap our AppNavigator component, which is the
 * component that contains all of our routes
 * @returns The App component is being returned
 */
function App(): React.ReactElement {
  {% if cookiecutter.state_management == "graphql" -%}
  const [loadingCache, setLoadingCache] = useState<boolean>(true);

  useEffect(() => {
    persistor.restore().then(() => {
      initApolloClient();
      setLoadingCache(false);
    });
  }, []);
  {% endif -%}

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
  
  {% if cookiecutter.state_management == "graphql" -%}
  if (loadingCache || isNil(client)) {
    return (
      <View
        style={StyleSheet.flatten([
          ApplicationStyles.viewStyle.screen,
          ApplicationStyles.viewStyle.centerAlign
        ])}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  {% endif -%}

  return (
    <GestureHandlerRootView style={ApplicationStyles.viewStyle.screen}>
      <ThemeProvider getStorageString={getStorageString} setStorageString={setStorageString}>
        <SafeAreaProvider style={ApplicationStyles.viewStyle.screen}>
          <StatusBar animated hidden={false} />
          {% if cookiecutter.state_management != 'graphql' -%}
          <Provider store={Store.store}>
            <PersistGate loading={null} persistor={Store.persistor}>
              <AppNavigator />
            </PersistGate>
          </Provider>
          {% elif cookiecutter.state_management == "graphql" -%}
          <ApolloProvider client={client}>
            <AppNavigator />
          </ApolloProvider>
          {% else -%}
            <AppNavigator />
          {% endif -%}
          <Toast
            translucent
            numberOfLines={2}
            toastPosition={'bottom'}
            ref={(ref) => ToastHolder.setToast(ref)}
          />
          <FullScreenProgress ref={(ref) => FullScreenProgressHolder.setFullScreenProgress(ref)} />
          <HorizontalProgress ref={(ref) => HorizontalProgressHolder.setHorizontalProgress(ref)} />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default AppConst.isDevelopment ? App : withCodePush(App);
