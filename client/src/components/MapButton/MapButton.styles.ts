import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

export const Container = styled(Pressable)`
  padding-vertical: 11px;
  padding-horizontal: 18px;
  border-radius: 100px;
  display: flex;
  background: black;
  flex-direction: row;
  position: absolute;
  flex: 1;
  bottom: 20px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 100;
`;
export const MapIcon = styled(Icon).attrs({
  name: 'map',
  color: 'white',
})`
  margin-left: 4px;
`;
