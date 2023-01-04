import { StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import RootNavigation from './src/navigation';
import store from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import './src/core/extensions';
import { useFonts } from 'expo-font';

export default function App() {
  let persistor = persistStore(store);

  let [fontsLoaded, error] = useFonts({
    'Noto-Sans': require('./assets/fonts/NotoSans-Regular.ttf'),
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
        <StatusBar animated={true} />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Noto-Sans',
  },
});
