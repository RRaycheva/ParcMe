import React, { useCallback, useEffect } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import GarageList from '../../components/GarageList';
import Search from '../../components/Search';
import { getGarages as getGaragesAction } from '../../redux/actions/garages';
import { GaragesState } from '../../redux/reducers/garages';
import { RootState } from '../../redux/store';
import { GarageDto } from '../../services/garageService';
import MapSheet from '../MapModal';
import { Container, SearchContainer } from './Home.styles';

interface HomeProps extends StackScreenProps<any> {
  garages: GaragesState;
  getGarages: () => Promise<void>;
}
function Home({ getGarages, garages, navigation }: HomeProps) {
  const onSelectGarage = useCallback(
    (item: GarageDto) => {
      navigation.navigate('SharedElementDetailPage', { garage: { ...item } });
    },
    [navigation],
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getGarages);
    return unsubscribe;
  }, [getGarages, navigation]);

  return (
    <Container>
      <GarageList
        garages={garages}
        stickyHeader
        id="home"
        onSelect={onSelectGarage}
        header={
          <SearchContainer>
            <SafeAreaView edges={['top']} />
            <Search />
          </SearchContainer>
        }
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
