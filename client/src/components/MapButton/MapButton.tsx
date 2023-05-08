import React from 'react';
import { useEffect, useState } from 'react';
import { Dimensions, GestureResponderEvent, Text } from 'react-native';
import { Container, MapIcon } from './MapButton.styles';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

interface MapButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

function MapButton(props: MapButtonProps) {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    console.log('mount');
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  }, []);

  return (
    <Container
      onPress={props.onPress}
      style={{ left: dimensions.window.width / 2.6 }}>
      <Text style={{ color: 'white' }}>Map</Text>
      <MapIcon />
    </Container>
  );
}

export default MapButton;
