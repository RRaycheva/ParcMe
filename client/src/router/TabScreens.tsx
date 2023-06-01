import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Account from '../screens/Account';
import Home from '../screens/Home';
import Inbox from '../screens/Inbox';
import Wishlist from '../screens/Wishlist';
import { theme } from '../theme/theme';

const Tab = createBottomTabNavigator();

const defaultScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  lazy: true,
  tabBarActiveTintColor: theme.colors.primary,
};

function TabScreens() {
  return (
    <Tab.Navigator screenOptions={defaultScreenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
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
