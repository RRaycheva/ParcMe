import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { DetailPage } from '../components/DetailPage';
import Account from '../screens/Account';
import Home from '../screens/Home';
import Inbox from '../screens/Inbox';
import Wishlist from '../screens/Wishlist';
import {
  defaultScreenOptions,
  defaultTabScreenOptions,
  sharedElementOptions,
} from './options';

const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();

function HomeScreens() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="DetailPage"
        component={DetailPage}
        options={sharedElementOptions}
      />
    </Stack.Navigator>
  );
}

function TabScreens() {
  return (
    <Tab.Navigator screenOptions={defaultTabScreenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreens}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: props => <Icon name="search" {...props} />,
        }}
      />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Inbox" component={Inbox} />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: props => (
            <MaterialIcon name="account-circle" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabScreens;
