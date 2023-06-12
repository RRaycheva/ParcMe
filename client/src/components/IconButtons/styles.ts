import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const Container = styled(TouchableOpacity)`
  padding: 4px;
  margin: 12px;
  background-color: white;
  border-radius: 32px;
  shadow-opacity: 0.5;
  shadow-radius: 8px;
  elevation: 5;
  shadow-color: black;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  min-height: 40px;
`;
