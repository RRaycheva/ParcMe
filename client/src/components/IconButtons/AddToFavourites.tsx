import React, { useMemo } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../theme/theme';
import { Container } from './styles';

interface Props {
  onPress?: () => void;
  active?: boolean;
}
function AddToFavButton({ onPress, active }: Props) {
  const name = useMemo(() => (active ? 'heart' : 'heart-o'), [active]);
  return (
    <Container onPress={onPress}>
      <FontAwesome name={name} size={16} color={theme.colors.primary} />
    </Container>
  );
}

export default React.memo(AddToFavButton);
