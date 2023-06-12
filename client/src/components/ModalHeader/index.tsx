import React from 'react';
import * as Animatable from 'react-native-animatable';
import { CloseButton } from '../IconButtons';

function ModalHeader() {
  return (
    <Animatable.View animation="fadeIn">
      <CloseButton />
    </Animatable.View>
  );
}

export default ModalHeader;
