import React from 'react';
import { ImageBackground, Keyboard, KeyboardAvoidingView } from 'react-native';
import { styles } from './Background.styles';

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}>
      <KeyboardAvoidingView
        style={styles.container}
        onTouchStart={Keyboard.dismiss}
        behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
