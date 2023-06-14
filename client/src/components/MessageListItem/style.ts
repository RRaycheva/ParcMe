import { Image, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

export const MessageListSeparator = styled(View)`
  background-color: rgba(0, 0, 0, 0.1);
  height: 1px;
  margin: 0 16px;
`;

export const Container = styled(TouchableOpacity)`
  flex: 1;
  height: 100px;
  flex-direction: row;
  align-items: center;
  margin: 0 16px;
`;

export const ProfilePicture = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 64px;
  margin-right: 16px;
`;

export const Name = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
`;

export const Message = styled(Text)`
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
`;

export const ContentContainer = styled(View)`
  gap: 16px;
  flex: 1;
`;

export const DateText = styled(Text)`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`;
