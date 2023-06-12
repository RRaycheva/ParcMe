import { FlatList, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

export const Container = styled(View)`
  flex: 1;
`;

export const SearchContainer = styled(LinearGradient).attrs({
  locations: [0.5, 1],
  colors: ['rgba(255,255,255,0.5)', 'transparent'],
})`
  margin-top: -8px;
  margin-bottom: 8px;
  overflow: visible;
`;

export const CardList = styled(FlatList)`
  padding-top: 8px;
  padding-bottom: 15%;
`;

export const MapContainer = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
