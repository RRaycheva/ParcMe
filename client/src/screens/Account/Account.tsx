import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { List } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { clearUser } from '../../redux/actions/auth';
import {
  Container,
  ListSectionHeader,
  PageTitle,
  styles,
} from './Account.styles';

interface AccountProps extends NativeStackScreenProps<any> {
  clearUser: () => void;
}
function Account({ navigation, clearUser }: AccountProps) {
  const handleLogout = useCallback(async () => {
    try {
      clearUser();
      navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
    } catch (error) {}
  }, [clearUser, navigation]);

  return (
    <Container contentContainerStyle={styles.scrollContainer}>
      <PageTitle>Profile</PageTitle>
      <List.Section
        style={styles.listSection}

        // title="Profile"
        // titleStyle={styles.sectionTitle}
      >
        <ListSectionHeader>Hosting</ListSectionHeader>
        <List.Item
          title="Add your place"
          onPress={() => navigation.push('AddNewPlace')}
          left={() => <MaterialIcons name="add" size={24} />}
          right={() => <MaterialCommunityIcons name="arrow-right" size={24} />}
        />
        <List.Item
          title="Your places"
          left={() => <MaterialCommunityIcons name="warehouse" size={24} />}
          right={() => <MaterialCommunityIcons name="arrow-right" size={24} />}
        />
      </List.Section>
      <Button
        mode="outlined"
        style={styles.logoutButton}
        onPress={handleLogout}>
        Log out
      </Button>
    </Container>
  );
}

export default React.memo(
  connect(null, {
    clearUser,
  })(Account),
);
