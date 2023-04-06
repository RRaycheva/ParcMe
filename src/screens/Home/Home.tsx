import React from 'react';
import { SafeAreaView } from 'react-native';
import Card from '../../components/Card';
import Search from '../../components/Search';

import { CardList, Container, SearchContainer } from './Home.styles';

function Home() {
  const renderCard = ({ index }) => {
    return <Card key={`home-card-${index}`} />;
  };
  return (
    <Container>
      <SearchContainer>
        <SafeAreaView />
        <Search />
      </SearchContainer>
      <CardList data={[...new Array(6).keys()]} renderItem={renderCard} />
    </Container>
  );
}

export default Home;
