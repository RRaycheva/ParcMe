import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  StackCardInterpolationProps,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import ModalHeader from '../components/ModalHeader';
import { theme } from '../theme/theme';

export const defaultTabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  lazy: true,
  tabBarActiveTintColor: theme.colors.primary,
};

export const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'white' },
};

export const sharedElementOptions: StackNavigationOptions = {
  presentation: 'modal',
  detachPreviousScreen: false,
  cardStyle: { backgroundColor: 'transparent' },
  cardStyleInterpolator: (options: StackCardInterpolationProps) => {
    return {
      ...CardStyleInterpolators.forModalPresentationIOS(options),
      cardStyle: {
        ...CardStyleInterpolators.forModalPresentationIOS(options).cardStyle,
        opacity: options.index === 0 ? 0.5 : 1,
        backgroundColor: 'transparent',
        margin: 0,
        transform: [],
      },
      overlayStyle: { opacity: 0 },
    };
  },
  headerShown: false,
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
