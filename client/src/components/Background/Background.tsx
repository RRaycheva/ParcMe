import React from 'react';
import { ImageBackground, Keyboard, View } from 'react-native';
import { styles } from './Background.styles';

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}>
      <View style={styles.container} onTouchStart={Keyboard.dismiss}>
        {children}
      </View>
    </ImageBackground>
  );
}
