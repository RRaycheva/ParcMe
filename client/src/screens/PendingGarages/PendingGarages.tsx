import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import GarageList from '../../components/GarageList';
import { CloseButton } from '../../components/IconButtons';
import { PageTitle } from '../../components/PageTitle';
import garageService, { GarageDto } from '../../services/garageService';
import { Container, HeaderContainer } from './PendingGarages.styles';

interface PendingGaragesProps extends StackScreenProps<any> {}
function PendingGarages({ navigation }: PendingGaragesProps) {
  const [pendingGarages, setPendingGarages] = useState<GarageDto[]>([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setPendingGarages(await garageService.getPending());
    });
    return unsubscribe;
  }, [navigation]);

  const onSelectGarage = useCallback(
    (item: GarageDto) => {
      navigation.navigate('SharedElementDetailPage', { garage: { ...item } });
    },
    [navigation],
  );

  const renderHeader = () => {
    return (
      <HeaderContainer>
        <CloseButton />
        <PageTitle style={{ margin: 8 }}>Pending approval</PageTitle>
      </HeaderContainer>
    );
  };

  return (
    <Container>
      <GarageList
        id="wishlist"
        garages={pendingGarages}
        onSelect={onSelectGarage}
        header={renderHeader()}
      />
    </Container>
  );
}

export default React.memo(PendingGarages);
