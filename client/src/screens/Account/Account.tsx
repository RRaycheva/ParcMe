import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { List } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { PageTitle } from '../../components/PageTitle';
import { clearUser } from '../../redux/actions/auth';
import { RootState } from '../../redux/store';
import { AuthResponseDto } from '../../services/authService';
import { Container, ListSectionHeader, styles } from './Account.styles';

interface AccountProps extends NativeStackScreenProps<any> {
  user: AuthResponseDto['user'];
  clearUser: () => void;
}
function Account({ navigation, user, clearUser }: AccountProps) {
  const handleLogout = useCallback(async () => {
    try {
      clearUser();
      navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
    } catch (error) {}
  }, [clearUser, navigation]);

  const renderAdminSection = () => {
    if (!user?.isAdmin) {
      return null;
    }
    return (
      <List.Section style={styles.listSection}>
        <ListSectionHeader>Admin</ListSectionHeader>
        <List.Item
          title="Pending garages"
          onPress={() => navigation.push('PendingGarages')}
          left={() => <MaterialIcons name="pending" size={24} />}
          right={() => <MaterialCommunityIcons name="arrow-right" size={24} />}
        />
      </List.Section>
    );
  };

  return (
    <Container contentContainerStyle={styles.scrollContainer}>
      <PageTitle>Profile</PageTitle>
      <List.Section style={styles.listSection}>
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
      {renderAdminSection()}
      <Button
        mode="outlined"
        style={styles.logoutButton}
        onPress={handleLogout}>
        Log out
      </Button>
    </Container>
  );
}

const mapStateToProps = ({ auth }: RootState) => {
  return {
    user: auth.user,
  };
};

export default React.memo(
  connect(mapStateToProps, {
    clearUser,
  })(Account),
);
