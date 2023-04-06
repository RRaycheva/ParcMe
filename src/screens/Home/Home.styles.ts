import { FlatList, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  flex: 1;
`;

export const SearchContainer = styled(View)`
  background: white
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0,0,0,0.5)
`;

export const CardList = styled(FlatList)`
  padding-top: 8px;
`;
