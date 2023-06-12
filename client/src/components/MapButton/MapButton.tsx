import React from 'react';
import { GestureResponderEvent, Text } from 'react-native';
import { Container, MapIcon, ViewContainer } from './MapButton.styles';

interface MapButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}

function MapButton(props: MapButtonProps) {
  return (
    <ViewContainer>
      <Container onPress={props.onPress}>
        <Text style={{ color: 'white' }}>Map</Text>
        <MapIcon />
      </Container>
    </ViewContainer>
  );
}

export default MapButton;
