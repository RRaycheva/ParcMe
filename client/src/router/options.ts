import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { Dimensions } from 'react-native';
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
};

export const sharedElementOptions: StackNavigationOptions = {
  presentation: 'card',
  detachPreviousScreen: false,
  cardStyle: {
    backgroundColor: 'transparent',
    ...defaultShadow,
  },
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
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
