import React from 'react';
import { Dimensions } from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
import {
  CardImage,
  CardImageContainer,
  CardInfoContainer,
  CARD_MARGIN,
  Container,
  Price,
  Subtitle,
  Title,
} from './Card.styles';

const exampleImages = [
  'https://picsum.photos/id/237/200/300',
  'https://picsum.photos/id/240/200/300',
  'https://picsum.photos/id/250/200/300',
  'https://picsum.photos/id/230/200/300',
];

function Card() {
  const { width } = Dimensions.get('window');
  const renderImage = ({ item, index }) => {
    return (
      <CardImageContainer>
        <CardImage source={{ uri: item }} key={`card-image-${index}`} />
      </CardImageContainer>
    );
  };
  return (
    <Container elevation={6}>
      <Carousel
        data={exampleImages}
        renderItem={renderImage}
        width={width - CARD_MARGIN * 2}
        height={200}
        loop={false}
      />
      <CardInfoContainer>
        <Title>Title</Title>
        <Subtitle>Subtitle</Subtitle>
        <Price>
          price <Subtitle>/ monnth</Subtitle>
        </Price>
      </CardInfoContainer>
    </Container>
  );
}

export default Card;
