import { BlurView } from '@react-native-community/blur';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import ModalHeader from '../components/ModalHeader';
import { defaultShadow, theme } from '../theme/theme';

export const defaultTabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  lazy: false,
  tabBarActiveTintColor: theme.colors.primary,
};

export const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
  animationTypeForReplace: 'pop',
  cardStyle: { backgroundColor: 'white' },
  headerTransparent: true,
  headerBackground: () => (
    <BlurView
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="white"
      style={StyleSheet.absoluteFill}
    />
  ),
};

export const sharedElementOptions: StackNavigationOptions = {
  presentation: 'card',
  detachPreviousScreen: false,
  cardStyle: {
    backgroundColor: 'transparent',
    ...defaultShadow,
  },
  cardOverlayEnabled: true,
  cardOverlay: props => (
    <View style={[StyleSheet.absoluteFill, props.style as any]}>
      <BlurView
        blurType="ultraThinMaterialDark"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
        style={[StyleSheet.absoluteFill]}
      />
    </View>
  ),
  cardStyleInterpolator: ({ current }) => {
    return {
      cardStyle: {
        opacity: current.progress,
      },
      overlayStyle: {
        opacity: current.progress,
      },
    };
  },
  headerShown: false,
  gestureEnabled: false,
};

export const modalOptions: StackNavigationOptions = {
  presentation: 'modal',
  cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
  gestureEnabled: true,
  headerShown: true,
  header: ModalHeader,
  headerTransparent: false,
  gestureResponseDistance: Dimensions.get('window').height,
};

export const pushedPageOptions: StackNavigationOptions = {
  headerShown: true,
  title: '',
  headerBackTitleStyle: { color: theme.colors.primary },
  headerTintColor: theme.colors.primary,
  headerTitleStyle: { color: theme.colors.secondary },
};
