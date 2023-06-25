import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header/';
import TextInput from '../../components/TextInput';
import { emailValidator, passwordValidator } from '../../helpers/helpers';
import { setUser } from '../../redux/actions/auth';
import { RootState } from '../../redux/store';
import authService, { AuthResponseDto } from '../../services/authService';
import { styles } from './Login.styles';

interface LoginScreenProps extends NativeStackScreenProps<any> {
  setUser: (user: AuthResponseDto) => void;
}

function LoginScreen({ navigation, setUser }: LoginScreenProps) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    try {
      const response = await authService.login(email.value, password.value);
      setUser(response);
      navigation.reset({ index: 0, routes: [{ name: 'Launcher' }] });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Background>
      <Header>Welcome back.</Header>
      <TextInput
        description="Email"
        label="Email"
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
        description="Password"
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const mapStateToProps = ({ auth }: RootState) => {
  return {
    auth,
  };
};
export default React.memo(
  connect(mapStateToProps, {
    setUser,
  })(LoginScreen),
);

// export default React.memo(LoginScreen);
