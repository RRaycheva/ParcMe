import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from '../../helpers/helpers';
import authService from '../../services/authService';
import { styles } from './Register.styles';

type Props = NativeStackScreenProps<any>;
export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    try {
      const response = await authService.register(
        name.value,
        email.value,
        password.value,
      );
      navigation.reset({
        index: 0,
        routes: [{ name: 'Launcher' }],
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Background>
      <Header>Create Account</Header>
      <TextInput
        description="Name"
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        description="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        description="Password"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}>
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
