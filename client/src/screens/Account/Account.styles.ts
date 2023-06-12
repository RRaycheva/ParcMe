import { ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  listSection: {
    flex: 1,
    width: '100%',
  },
  logoutButton: { maxWidth: '60%' },
  scrollContainer: { flex: 1, alignItems: 'center' },
});

export const Container = styled(ScrollView)`
  /* margin: 0 24px; */
  padding: 48px 18px;
`;

export const ListSectionHeader = styled(List.Subheader)`
  font-weight: bold;
  font-size: 18px;
`;
