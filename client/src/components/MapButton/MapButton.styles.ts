import { Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

export const ViewContainer = styled(View)`
  position: absolute;
  bottom: 20px;
  width: 100%;
  z-index: 100;
  justify-content: center;
  align-items: center;
`;

export const Container = styled(Pressable)`
  padding-vertical: 11px;
  padding-horizontal: 18px;
  border-radius: 100px;
  display: flex;
  background: black;
  flex-direction: row;
  flex: 1;
  width: 80px;
  justify-content: center;
  align-items: center;
  shadow-opacity: 0.5;
  shadow-radius: 5px;
  shadow-color: black;
  shadow-offset: 0px 0px;
  elevation: 5;
`;
export const MapIcon = styled(Icon).attrs({
  name: 'map',
  color: 'white',
})`
  margin-left: 4px;
`;
