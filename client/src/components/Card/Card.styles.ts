import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SharedElement } from 'react-navigation-shared-element';
import styled from 'styled-components';

export const CARD_MARGIN = 8;
export const Container = styled(SharedElement)`
  margin: ${CARD_MARGIN}px;
  overflow: hidden;
  border-radius: 8px;
`;

export const CardImageContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: transparent;
`;

export const CardImage = styled(Image).attrs({
  resizeMode: 'cover',
})`
  flex: 1;
  width: 100%;
  height: 300px;
`;

export const CardInfoContainer = styled(LinearGradient)`
  flex-direction: column;
  padding: 16px;
  padding-top: 100px;
  flex: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 2;
`;

const Common = styled(Text)`
  font-size: 16px;
  margin-vertical: 2px;
`;

export const Title = styled(Common)`
  font-weight: bold;
`;

export const Subtitle = styled(Common)`
  font-weight: normal;
`;

export const Price = styled(Title)``;
