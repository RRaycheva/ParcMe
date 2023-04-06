import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MainScreens from './MainScreens';

function Navigation() {
  return (
    <NavigationContainer>
      <MainScreens />
    </NavigationContainer>
  );
}

export default Navigation;
