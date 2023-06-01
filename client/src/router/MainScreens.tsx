import {
  CardStyleInterpolators,
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import AddNewPlace from '../screens/AddNewPlace/AddNewPlace';
import { Launcher } from '../screens/Launcher';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabScreens from './TabScreens';

const Stack = createStackNavigator();

const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
  cardOverlayEnabled: true,
};

function MainScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Launcher"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Launcher" component={Launcher} />
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="RegisterScreen" component={Register} />
      <Stack.Screen name="Dashboard" component={TabScreens} />
      <Stack.Screen
        name="AddNewPlace"
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        component={AddNewPlace}
      />
    </Stack.Navigator>
  );
}

export default React.memo(MainScreens);
