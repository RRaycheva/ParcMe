import { MAPBOX_TOKEN } from '@env';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import Card from '../../components/Card';
import MapButton from '../../components/MapButton';
import Search from '../../components/Search';

import Mapbox from '@rnmapbox/maps';
import {
  CardList,
  Container,
  MapContainer,
  SearchContainer,
} from './Home.styles';

Mapbox.setAccessToken(MAPBOX_TOKEN);

function Home() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const renderCard = ({ index }) => {
    return <Card key={`home-card-${index}`} />;
  };

  return (
    <Container>
      <SearchContainer elevation={2}>
        <SafeAreaView />
        <Search />
      </SearchContainer>
      <MapButton onPress={() => setIsMapOpen(current => !current)} />
      <CardList data={[...new Array(6).keys()]} renderItem={renderCard} />
      {isMapOpen && (
        <MapContainer>
          <Mapbox.MapView style={{ flex: 1 }} />
        </MapContainer>
      )}
    </Container>
  );
}

export default Home;
