import React from 'react';
import { ButtonProps, Button as PapperButton } from 'react-native-paper';
import { theme } from '../../theme/theme';
import { styles } from './Button.styles';

export default function Button(props: ButtonProps) {
  const { mode, style } = props;
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
  );
}
