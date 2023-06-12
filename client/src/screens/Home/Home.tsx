import React, { useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import Card from '../../components/Card';

import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Search from '../../components/Search';
import { getGarages as getGaragesAction } from '../../redux/actions/garages';
import { GaragesState } from '../../redux/reducers/garages';
import { RootState } from '../../redux/store';
import { GarageDto } from '../../services/garageService';
import MapSheet from '../MapModal';
import { CardList, Container, SearchContainer } from './Home.styles';

interface HomeProps extends StackScreenProps<any> {
  garages: GaragesState;
  getGarages: () => Promise<void>;
}
function Home({ getGarages, garages, navigation }: HomeProps) {
  const renderCard: ListRenderItem<GarageDto> = ({ item }) => {
    const id = `home-card-${item.id}`;
    return (
      <Card
        key={id}
        id={id}
        images={item.pictures}
        title={item.name}
        subtitle={item.addressName}
        price={item.pricePerHour}
        onPress={() =>
          navigation.navigate('DetailPage', { garage: { ...item, id } })
        }
      />
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getGarages);
    return unsubscribe;
  }, [getGarages, navigation]);

  return (
    <Container>
      <CardList
        data={garages}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ paddingBottom: '30%' }}
        ListHeaderComponent={
          <SearchContainer>
            <SafeAreaView edges={['top']} />
            <Search />
          </SearchContainer>
        }
        renderItem={renderCard as any}
      />
      <MapSheet title={`${garages.length} garages available`} />
    </Container>
  );
}

const mapStateToProps = ({ garages }: RootState) => {
  return {
    garages,
  };
};
export default React.memo(
  connect(mapStateToProps, {
    getGarages: getGaragesAction,
  })(Home),
);
