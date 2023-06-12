import React from 'react';
import { Dimensions, Pressable, Text } from 'react-native';

import { PARCK_ME_SERVER } from '@env';

import Carousel from 'react-native-reanimated-carousel';
import { SharedElement } from 'react-navigation-shared-element';
import {
  CardImage,
  CardInfoContainer,
  Container,
  Price,
  Subtitle,
} from './Card.styles';

interface CardProps {
  id: string | number;
  images?: string[];
  title: string;
  subtitle?: string;
  price?: number;
  onPress?: () => void;
}
function Card({ images, title, subtitle, price, onPress, id }: CardProps) {
  const { width } = Dimensions.get('window');
  const renderImage = ({ item, index }) => {
    return (
      // <CardImageContainer>
      <CardImage
        source={{ uri: `${PARCK_ME_SERVER}${item}` }}
        key={`card-image-${index}`}
      />
      // </CardImageContainer>
    );
  };

  return (
    <Pressable onPress={onPress}>
      <Container id={`${id}-container`}>
        <Carousel
          key={`${id}-container`}
          data={images || []}
          renderItem={renderImage}
          width={width}
          height={300}
          loop={false}
          style={{ alignSelf: 'center' }}
        />
        <SharedElement id={`${id}-description`} style={{ zIndex: 1 }}>
          <CardInfoContainer
            colors={['transparent', 'rgba(255,255,255, 0.5)', 'white']}>
            <Text style={{ fontSize: 24 }}>{title}</Text>
            <SharedElement id={`${id}-address`}>
              <Text>{subtitle}</Text>
            </SharedElement>
            <Price>
              {price} <Subtitle>/ hour</Subtitle>
            </Price>
          </CardInfoContainer>
        </SharedElement>
      </Container>
    </Pressable>
  );
}

export default Card;
