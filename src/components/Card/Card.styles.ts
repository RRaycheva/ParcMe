import { Surface } from '@react-native-material/core';
import { Dimensions, Image, Text, View } from 'react-native';
import styled from 'styled-components';

export const CARD_MARGIN = 8;
export const Container = styled(Surface)`
  margin: ${CARD_MARGIN}px;
  border-radius: 8px;
  flex-direction: column;
  overflow: hidden;
  min-height: 200px;
`;

export const CardImageContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const CardImage = styled(Image).attrs({
  resizeMode: 'cover',
})`
  flex: 1;
  width: ${Dimensions.get('window').width}px;
`;

export const CardInfoContainer = styled(View)`
  flex-direction: column;
  padding: 16px;
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
