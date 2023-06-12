import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';

const CloseButtonContainer = styled(Pressable)`
  position: absolute;
  /* top: 16px; */
  left: 0px;
  padding: 16px;
`;

function CloseButton() {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.canGoBack() && navigation.goBack();
  }, [navigation]);

  return (
    <CloseButtonContainer onPress={onPress} style={{ padding: 16 }}>
      <MaterialIcons name="close" size={32} />
    </CloseButtonContainer>
  );
}

export default React.memo(CloseButton);
