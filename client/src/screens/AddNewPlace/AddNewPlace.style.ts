import { Image, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import styled from 'styled-components';

export const Title = styled(Text)`
  font-weight: bold;
  font-size: 28px;
  opacity: 0.8;
`;

export const ImagePreviewTitle = styled(Text)`
  margin-left: 16px;
  margin-bottom: 8px;
  font-size: 16px;
`;
export const ImagePreviewContainer = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
})`
  height: 200px;
  flex-grow: 0;
`;

export const ImagePreview = styled(Image)`
  width: 128px;
  height: 128px;
  border-radius: 8px;
`;
