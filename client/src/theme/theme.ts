import { ShadowStyleIOS } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#560CCE',
    secondary: '#414757',
    error: '#f13a59',
  },
};

export const defaultShadow: ShadowStyleIOS & { elevation: number } = {
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 5,
  shadowColor: 'rgba(0,0,0,0.5)',
};
