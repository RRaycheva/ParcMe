import React from 'react'
import { theme } from '../../theme/theme'
import { styles } from './Button.styles'
import { Button as PapperButton } from 'react-native-paper'

export default function Button({ mode, style, ...props }) {
  return (
    <PapperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

