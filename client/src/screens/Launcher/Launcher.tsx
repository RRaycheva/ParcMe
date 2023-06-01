import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/auth';
import { RootState } from '../../redux/store';
import authService, { AuthResponseDto } from '../../services/authService';
import { LauncherView } from './Launcher.styles';

interface LauncherProps extends NativeStackScreenProps<any> {
  setUser: (user: AuthResponseDto) => void;
}
function Launcher({ navigation, setUser }: LauncherProps) {
  useEffect(() => {
    authService.check().then(authorizedUser => {
      authorizedUser && setUser(authorizedUser);
      navigation.reset({
        index: 0,
        routes: [{ name: authorizedUser ? 'Dashboard' : 'LoginScreen' }],
      });
    });
  }, [navigation, setUser]);
  return (
    <LauncherView>
      <ActivityIndicator />
    </LauncherView>
  );
}

const mapStateToProps = ({ auth }: RootState) => {
  return {
    auth,
  };
};

export default React.memo(
  connect(mapStateToProps, {
    setUser,
  })(Launcher),
);
