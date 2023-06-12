import React, { useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import Card from '../../components/Card';

import { GarageDto } from '../../services/garageService';
import { CardList } from './styles';

interface GarageListProps {
  garages: GarageDto[];
  id?: string;
  onSelect?: (garage: GarageDto & { shareId: string }) => void;
  header?: React.ReactElement;
  stickyHeader?: boolean;
}
function GarageList({
  id: idParam = 'list-item',
  garages,
  onSelect,
  header,
  stickyHeader,
}: GarageListProps) {
  const renderCard: ListRenderItem<GarageDto> = useCallback(
    ({ item }) => {
      const id = `${idParam}-${item.id}`;
      return (
        <Card
          key={id}
          id={id}
          images={item.pictures}
          title={item.name}
          subtitle={item.addressName}
          price={item.pricePerHour}
          onPress={() => onSelect && onSelect({ ...item, shareId: id })}
        />
      );
    },
    [onSelect, idParam],
  );

  return (
    <CardList
      data={garages}
      stickyHeaderIndices={stickyHeader ? [0] : []}
      contentContainerStyle={{ paddingBottom: '30%' }}
      ListHeaderComponent={header}
      renderItem={renderCard as any}
    />
  );
}

export default React.memo(GarageList);
