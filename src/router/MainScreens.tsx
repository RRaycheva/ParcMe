import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/Login';
import TabScreens from './TabScreens';

const Stack = createNativeStackNavigator();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

function MainScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Main" component={TabScreens} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default MainScreens;
