import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from './Background.styles';

export default function Background({ children }) {
  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    const willShow = Keyboard.addListener('keyboardWillShow', () =>
      setKeyboardShown(true),
    );
    const willHide = Keyboard.addListener('keyboardWillHide', () =>
      setKeyboardShown(false),
    );
    return () => {
      willShow.remove();
      willHide.remove();
    };
  }, []);
  return (
    <ImageBackground
      source={require('../../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}>
      <KeyboardAvoidingView
        enabled={keyboardShown}
        behavior={'padding'}
        contentContainerStyle={styles.container}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>{children}</>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
