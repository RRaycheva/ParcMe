import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Container } from './styles';

function CloseButton() {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.canGoBack() && navigation.goBack();
  }, [navigation]);

  return (
    <Container onPress={onPress}>
      <MaterialIcons name="close" size={32} />
    </Container>
  );
}

export default React.memo(CloseButton);
