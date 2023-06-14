import { PARCK_ME_SERVER } from '@env';
import React, { useCallback, useMemo } from 'react';
import { ChatListDto } from '../../services/chatService';
import { UserDto } from '../../services/userService';
import {
  Container,
  ContentContainer,
  DateText,
  Message,
  Name,
  ProfilePicture,
} from './style';

interface Props {
  chatListItem: ChatListDto;
  onPress?: (user: UserDto) => void;
}
function MessageListItem({ chatListItem, onPress: onPressParam }: Props) {
  const date = useMemo(() => {
    const parsed = new Date(chatListItem.created_at);
    return parsed.toDateString();
  }, [chatListItem.created_at]);

  const onPress = useCallback(() => {
    onPressParam && onPressParam(chatListItem.receiver);
  }, [onPressParam, chatListItem.receiver]);

  return (
    <Container activeOpacity={0.5} onPress={onPress}>
      <ProfilePicture
        source={{
          uri: `${PARCK_ME_SERVER}${chatListItem.receiver.profile_picture}`,
        }}
      />
      <ContentContainer>
        <Name numberOfLines={1}>{chatListItem.receiver.name}</Name>
        <Message numberOfLines={2}>{chatListItem.content}</Message>
      </ContentContainer>
      <DateText>{date}</DateText>
    </Container>
  );
}

export default React.memo(MessageListItem);
