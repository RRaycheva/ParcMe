import { theme } from '../../theme/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  })