import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import AddNewPlace from '../screens/AddNewPlace/AddNewPlace';
import { DetailPage } from '../screens/DetailPage';
import { Launcher } from '../screens/Launcher';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabScreens from './TabScreens';
import {
  defaultScreenOptions,
  modalOptions,
  sharedElementOptions,
} from './options';

const Stack = createSharedElementStackNavigator();

function MainScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Launcher"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Launcher" component={Launcher} />
      <Stack.Screen name="Dashboard" component={TabScreens} />
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="RegisterScreen" component={Register} />
      <Stack.Screen
        name="SharedElementDetailPage"
        component={DetailPage}
        options={sharedElementOptions}
      />
      <Stack.Screen
        name="AddNewPlace"
        component={AddNewPlace}
        options={modalOptions}
      />
    </Stack.Navigator>
  );
}

export default React.memo(MainScreens);
