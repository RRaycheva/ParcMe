import { Surface } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

export const Container = styled(Surface)`
  margin-horizontal: 8px;
  padding-vertical: 16px;
  padding-horizontal: 20px;
  border-radius: 100px;
  flex-direction: row;
`;

export const SearchIcon = styled(Icon).attrs({
  name: 'search',
  size: 20,
})`
  margin-right: 8px;
`;
