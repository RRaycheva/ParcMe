import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import Card from '../../components/Card';
import MapButton from '../../components/MapButton';
import Search from '../../components/Search';

import { CardList, Container, SearchContainer } from './Home.styles';

function Home() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const renderCard = ({ index }) => {
    return <Card key={`home-card-${index}`} />;
  };

  return (
    <Container>
      <SearchContainer elevation={2}>
        {isMapOpen && <Text>Is open</Text>}
        <SafeAreaView />
        <Search />
      </SearchContainer>
      <MapButton onPress={() => setIsMapOpen(true)} />
      <CardList data={[...new Array(6).keys()]} renderItem={renderCard} />
    </Container>
  );
}

export default Home;
