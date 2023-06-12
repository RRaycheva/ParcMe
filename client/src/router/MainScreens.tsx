import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddNewPlace from '../screens/AddNewPlace/AddNewPlace';
import { Launcher } from '../screens/Launcher';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabScreens from './TabScreens';
import { defaultScreenOptions, modalOptions } from './options';

const Stack = createStackNavigator();

function MainScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Launcher"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Launcher" component={Launcher} />
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="RegisterScreen" component={Register} />
      <Stack.Screen name="Dashboard" component={TabScreens} />
      <Stack.Group screenOptions={modalOptions}>
        <Stack.Screen name="AddNewPlace" component={AddNewPlace} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default React.memo(MainScreens);
