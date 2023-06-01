import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navigation from './router/Navigation';

function App() {
  StatusBar.setBarStyle('dark-content');
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
