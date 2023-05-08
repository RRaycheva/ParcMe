import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../theme/theme'
import { StyleSheet } from 'react-native'

export const LoginContainer = styled(SafeAreaView)`
  flex: 1;
`;

export const styles = StyleSheet.create({
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    forgot: {
      fontSize: 13,
      color: theme.colors.secondary,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  })