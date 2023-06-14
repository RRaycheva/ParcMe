import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { debounce, isEmpty, isNil } from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import GarageList from '../../components/GarageList';
import { PageTitle } from '../../components/PageTitle';
import Search from '../../components/Search';
import { getGarages as getGaragesAction } from '../../redux/actions/garages';
import { GaragesState } from '../../redux/reducers/garages';
import { RootState } from '../../redux/store';
import garageService, { GarageDto } from '../../services/garageService';
import MapSheet from '../MapSheet';
import { Container, SearchContainer } from './Home.styles';

interface HomeProps extends StackScreenProps<any> {
  garages: GaragesState;
  getGarages: () => Promise<void>;
}
function Home({ getGarages, garages, navigation }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const defferedSearchQuery = useDeferredValue(searchQuery);
  const [searchResults, setSearchResults] = useState<GarageDto[] | null>(null);

  const hasSearchResults = useMemo(
    () => !isNil(searchResults) && !isEmpty(searchResults),
    [searchResults],
  );

  const noGaragesFound = useMemo(
    () => !isNil(searchResults) && searchResults.length === 0,
    [searchResults],
  );

  const results = useMemo(() => {
    if (noGaragesFound) {
      return [];
    }
    if (!hasSearchResults) {
      return garages;
    } else {
      return searchResults || [];
    }
  }, [garages, hasSearchResults, noGaragesFound, searchResults]);

  const onSelectGarage = useCallback(
    (item: GarageDto) => {
      navigation.navigate('SharedElementDetailPage', { garage: { ...item } });
    },
    [navigation],
  );

  const onSelectGarageFromMap = useCallback(
    (item: GarageDto) => {
      navigation.navigate('SharedElementDetailPage', {
        garage: { ...item },
        disableSharedTransition: true,
      });
    },
    [navigation],
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getGarages);
    return unsubscribe;
  }, [getGarages, navigation]);

  useEffect(() => {
    const debounced = debounce(async () => {
      if (isEmpty(defferedSearchQuery)) {
        return;
      }
      const response = await garageService.search(defferedSearchQuery);
      setSearchResults(response);
    }, 500);

    debounced();
    return () => {
      debounced.cancel();
    };
  }, [defferedSearchQuery]);

  useEffect(() => {
    // Clear results
    isEmpty(searchQuery) && setSearchResults(null);
  }, [searchQuery]);

  return (
    <Container>
      <GarageList
        garages={results}
        stickyHeader
        id="home"
        onSelect={onSelectGarage}
        emptyMessage={noGaragesFound ? <PageTitle>No results</PageTitle> : null}
        header={
          <SearchContainer>
            <SafeAreaView edges={['top']} />
            <Search
              value={searchQuery}
              hasResults={hasSearchResults || noGaragesFound}
              onChangeText={setSearchQuery}
            />
          </SearchContainer>
        }
      />

      <MapSheet
        title={`${results.length} garages available`}
        garages={results}
        onPress={onSelectGarageFromMap}
      />
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
