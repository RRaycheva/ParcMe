import React from 'react';
import { Text, View } from 'react-native';
import { TextInput as Input, TextInputProps } from 'react-native-paper';
import { theme } from '../../theme/theme';
import { styles } from './TextInput.styles';

interface CustomTextInputProps extends TextInputProps {
  errorText?: string;
  description?: string;
}
export default function TextInput({
  errorText,
  description,
  ...props
}: CustomTextInputProps) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}
