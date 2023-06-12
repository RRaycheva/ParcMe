import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import GarageList from '../../components/GarageList';
import { PageTitle } from '../../components/PageTitle';
import { getFavourites } from '../../redux/actions/favourites';
import { RootState } from '../../redux/store';
import { GarageDto } from '../../services/garageService';
import { Container } from './Wishlist.styles';

interface WishlistProps extends StackScreenProps<any> {
  favourites: GarageDto[];
  getFavourites: () => Promise<any>;
}
function Wishlist({ favourites, getFavourites, navigation }: WishlistProps) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getFavourites);
    return unsubscribe;
  }, [getFavourites, navigation]);

  const onSelectGarage = useCallback(
    (item: GarageDto) => {
      navigation.navigate('SharedElementDetailPage', { garage: { ...item } });
    },
    [navigation],
  );

  return (
    <Container>
      <GarageList
        id="wishlist"
        garages={favourites}
        onSelect={onSelectGarage}
        header={<PageTitle style={{ margin: 8 }}>Wishlist</PageTitle>}
      />
    </Container>
  );
}

const mapStateToProps = ({ favourites }: RootState) => {
  return {
    favourites,
  };
};
export default React.memo(
  connect(mapStateToProps, {
    getFavourites,
  })(Wishlist),
);
