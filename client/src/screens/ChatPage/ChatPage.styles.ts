import { Image, TextInput, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { theme } from '../../theme/theme';

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const MessageInputContainer = styled(View)`
  border-width: 1px;
  border-color: ${theme.colors.secondary};
  overflow: hidden;
  border-radius: 32px;
  flex-direction: row;
  align-items: center;
`;

export const MessageTextInput = styled(TextInput)`
  width: 80%;
  height: 40px;
  padding: 8px;
  font-size: 20px;
`;

export const MessageContainer = styled(View)<{ type: 'sender' | 'receiver' }>`
  flex-direction: row;
  align-self: ${({ type }) => (type === 'sender' ? 'flex-end' : 'flex-start')};
  margin: 4px;
`;

export const ProfilePicture = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  margin-right: 8px;
`;

export const Message = styled(Text)<{ type: 'sender' | 'receiver' }>`
  font-size: 18px;
  padding: 8px 12px;
  background-color: ${({ type }) =>
    type === 'sender'
      ? theme.colors.inverseOnSurface
      : theme.colors.inversePrimary};

  max-width: 80%;
  border-radius: 8px;
  overflow: hidden;
`;

export const SendButton = styled(Button)``;
