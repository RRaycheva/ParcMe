import { View } from 'react-native';
import styled from 'styled-components';

export const HeaderContainer = styled(View)`
  position: absolute;
  z-index: 10;
  top: 32px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const HostInfoContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
`;
