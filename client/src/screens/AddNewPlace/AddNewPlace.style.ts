import { Pressable, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import styled from 'styled-components';

export const LocationOverlay = styled(View)`
  margin-bottom: -150px;
  height: 150px;
  z-index: 10;
  border-radius: 8px;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  shadow-color: black;
  shadow-offset: 0px 0px;
  background: white;
  overflow: visible;
`;

export const SearchContainer = styled(ScrollView)`
  background: white;
  /* box-shadow: 2px 0px 50px 5px rgba(0, 0, 0, 0.75); */
`;

export const SearchItemView = styled(Pressable)`
  flex: 1;
  align-items: flex-start;
  /* border-bottom-width: 1px;
  border-bottom-color: black;
  border-bottom-style: solid; */
  padding: 8px 8px;
`;
export const SearchItemText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;

export const SearchItemSubText = styled(Text)`
  font-size: 14px;
`;

export const CloseButtonContainer = styled(Pressable)`
  position: absolute;
  top: 8px;
  left: 8px;
`;
