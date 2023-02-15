import React, { useEffect } from 'react';
import { persistor, store } from '@redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationApp, NavigationUtils } from '@navigation';
import { initI18n } from './src/translations';
import { ThemeProvider } from '@theme';
import { Alert, Linking, Platform, StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GlobalService, GlobalUI } from '@components';
import { Provider } from 'react-redux';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import codePush from "react-native-code-push";
import { getStatusBarHeight } from 'react-native-status-bar-height';
initI18n();
import dynamicLinks from '@react-native-firebase/dynamic-links';
import reactotron from 'reactotron-react-native';
const options = {
  // updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
};

function App() {
  useEffect(() => {
    Linking.addEventListener('url', (e)=>{
      console.log('runn',e.url)
      Alert.alert(e.url)
    });
    return () => Linking.removeAllListeners('url');
  }, []);
  useEffect(() => {
    codePush.sync(options);
  }, [])
  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <SafeAreaView style={styleApp.container} edges={['right', 'left']}>
          <ThemeProvider>
            <PersistGate loading={null} persistor={persistor}>
              <NavigationApp
                ref={(navigatorRef: any) => {
                  NavigationUtils.setTopLevelNavigator(navigatorRef);
                }}
              />
              <GlobalUI ref={GlobalService.globalUIRef} />
              <FlashMessage
                style={styleApp.messageNoti}
                position="top"
                floating={true}
                hideStatusBar={false}
              />
            </PersistGate>
          </ThemeProvider>
        </SafeAreaView>
      </SafeAreaProvider>

    </Provider>
  );
}

const styleApp = StyleSheet.create({
  messageNoti: {
    marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
  },
  container: {
    flex: 1,
  },
});

export default codePush(options)(App);
