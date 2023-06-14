import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import MessageListItem from '../../components/MessageListItem';
import { MessageListSeparator } from '../../components/MessageListItem/style';
import chatService, { ChatListDto } from '../../services/chatService';
import { UserDto } from '../../services/userService';
import { Container } from './Inbox.styles';

interface InboxProps extends StackScreenProps<any> {}
function Inbox({ navigation }: InboxProps) {
  const [messageList, setMessageList] = useState<ChatListDto[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setMessageList(await chatService.getMessageList());
    });
    return unsubscribe;
  }, [navigation]);

  const onPress = useCallback(
    (user: UserDto) => {
      navigation.push('ChatPage', { receiver: user });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<ChatListDto> = useCallback(
    ({ item }) => {
      return <MessageListItem chatListItem={item} onPress={onPress} />;
    },
    [onPress],
  );

  return (
    <Container>
      <FlatList
        data={messageList}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <MessageListSeparator />}
      />
    </Container>
  );
}

export default Inbox;
