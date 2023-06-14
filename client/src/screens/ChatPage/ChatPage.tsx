import { PARCK_ME_SERVER } from '@env';
import { StackScreenProps } from '@react-navigation/stack';
import { isEmpty, isNil } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Keyboard, ListRenderItem } from 'react-native';
import { trigger } from 'react-native-haptic-feedback';
import { ActivityIndicator } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import chatService, { ChatMessageItem } from '../../services/chatService';
import { UserDto } from '../../services/userService';
import {
  Container,
  Message,
  MessageContainer,
  MessageInputContainer,
  MessageTextInput,
  ProfilePicture,
  SendButton,
} from './ChatPage.styles';

interface ChatPageProps extends StackScreenProps<any> {}
function ChatPage({ navigation, route }: ChatPageProps) {
  const receiver = useMemo(() => {
    return route.params?.receiver as UserDto;
  }, [route.params]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const keyboardOffset = useSharedValue(0);
  // const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!isEmpty(receiver)) {
      navigation.setOptions({
        title: receiver.name,
        headerRight: () => (
          <ProfilePicture
            source={{
              uri: `${PARCK_ME_SERVER}${receiver.profile_picture}`,
            }}
          />
        ),
      });
    }
  }, [receiver, navigation]);

  useEffect(() => {
    chatService.connectSocket(msg => {
      trigger('rigid');
      setMessages(current => {
        return [msg, ...current];
      });
    });
    return () => {
      chatService.disconnectSocket();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if (isEmpty(receiver)) {
        return;
      }
      setLoading(false);
      const chatMessages = await chatService.getMessagesForUser(receiver.id);
      setMessages(chatMessages.messages);
      setLoading(false);
    });
    return unsubscribe;
  }, [navigation, receiver]);

  useEffect(() => {
    const willShow = Keyboard.addListener(
      'keyboardWillShow',
      event => (keyboardOffset.value = withTiming(event.endCoordinates.height)),
    );
    const willHide = Keyboard.addListener(
      'keyboardWillHide',
      () => (keyboardOffset.value = withTiming(0)),
    );
    return () => {
      willShow.remove();
      willHide.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = async () => {
    if (isEmpty(receiver) || isEmpty(message)) {
      return;
    }
    const response = await chatService.sendMessage({
      receiverId: receiver.id,
      content: message,
    });
    setMessage('');
    setMessages(current => {
      return [response, ...current];
    });
  };

  const handleLoadMore = useCallback(async () => {
    if (isNil(receiver.id) || loading) {
      return;
    }
    setLoading(true);
    const len = messages.length;
    const more = await chatService.getMessagesForUser(receiver.id, len);
    setMessages(current => [...current, ...more.messages]);
    setLoading(false);
  }, [receiver.id, messages.length, loading]);

  const renderItem: ListRenderItem<ChatMessageItem> = useCallback(
    ({ item }) => {
      const type = item.receiverId !== receiver.id ? 'receiver' : 'sender';
      return (
        <MessageContainer type={type}>
          {/* {type === 'receiver' && (
            <ProfilePicture
              source={{
                uri: `${PARCK_ME_SERVER}${receiver.profile_picture}`,
              }}
            />
          )} */}
          <Message selectable type={type}>
            {item.content}
          </Message>
        </MessageContainer>
      );
    },
    [receiver.id],
  );

  const keyExtractor = useCallback((item: ChatMessageItem, _index: number) => {
    return `message-${item.id}`;
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    paddingBottom: keyboardOffset.value,
    flex: 1,
  }));

  return (
    <Container edges={['bottom']}>
      <Animated.View style={animatedStyle}>
        {loading && <ActivityIndicator />}
        <FlatList
          inverted
          data={messages}
          extraData={messages}
          // contentContainerStyle={{ paddingBottom: 200 }}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReachedThreshold={0.4}
          onEndReached={handleLoadMore}
        />
        <MessageInputContainer>
          <MessageTextInput
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
          />
          <SendButton onPress={sendMessage}>Send</SendButton>
        </MessageInputContainer>
      </Animated.View>
    </Container>
  );
}

export default ChatPage;
