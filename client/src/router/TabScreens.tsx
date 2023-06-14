import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { ComponentType } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  SharedElementSceneComponent,
  createSharedElementStackNavigator,
} from 'react-navigation-shared-element';
import Account from '../screens/Account';
import Home from '../screens/Home';
import Inbox from '../screens/Inbox';
import Wishlist from '../screens/Wishlist';
import { defaultTabScreenOptions } from './options';

const Tab = createBottomTabNavigator();

const wrapInSharedElementStack = (
  Screen: SharedElementSceneComponent<any>,
  name: string,
): ComponentType<any> => {
  const SharedStack = createSharedElementStackNavigator();
  return () => (
    <SharedStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={name}>
      <SharedStack.Screen name={name} component={Screen} />
    </SharedStack.Navigator>
  );
};

/**
 * Make every tab a shared element stack navigator
 */
const HomeScreen = wrapInSharedElementStack(Home, 'Home');
const WishlistScreen = wrapInSharedElementStack(Wishlist, 'Wishlist');

function TabScreens() {
  return (
    <Tab.Navigator screenOptions={defaultTabScreenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: props => <FontAwesome name="search" {...props} />,
        }}
      />
      <Tab.Screen
        name="WishlistTab"
        component={WishlistScreen}
        options={{
          tabBarLabel: 'Wishlist',
          tabBarIcon: props => <FontAwesome name="heart-o" {...props} />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarIcon: props => <MaterialIcon name="inbox" {...props} />,
        }}
      />
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
