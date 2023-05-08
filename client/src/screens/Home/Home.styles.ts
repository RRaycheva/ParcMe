import { Surface } from '@react-native-material/core';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  flex: 1;
`;

export const SearchContainer = styled(Surface)`
  background: white;
  padding-bottom: 16px;
`;

export const CardList = styled(FlatList)`
  padding-top: 8px;
`;
