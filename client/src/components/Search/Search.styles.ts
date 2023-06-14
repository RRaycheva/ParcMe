import { BlurView } from '@react-native-community/blur';
import { Surface } from '@react-native-material/core';
import { TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

export const Container = styled(Surface)`
  margin-horizontal: 8px;
  padding: 0 20px;
  align-items: center;
  border-radius: 100px;
  flex-direction: row;
`;

const StyledIcon = styled(Icon).attrs({
  size: 20,
})`
  margin: 0 4px;
`;

export const SearchIcon = styled(StyledIcon).attrs({
  name: 'search',
})``;

export const ClearIcon = styled(StyledIcon).attrs({
  name: 'close',
})``;

export const SearchInput = styled(TextInput)<{ active }>`
  flex: 1;
  color: rgba(0, 0, 0, 0.8);
  font-weight: bold;
  font-size: 18px;
  padding-vertical: 16px;
  padding-horizontal: 20px;
`;

export const AnimatedBlurView = styled(
  Animated.createAnimatedComponent(BlurView),
)`
  position: absolute;
  top: -100%;
  left: 0;
`;
