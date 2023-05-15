import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { connect } from 'react-redux';
import React from 'react';
import TabScreens from './TabScreens';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

function MainScreens(props) {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={defaultScreenOptions}>
       { props.isLoggedIn ? 
         <Stack.Screen name="Dashboard" component={TabScreens} />
         : 
         <Stack.Screen name="LoginScreen" component={Login} />
        }
        <Stack.Screen name="RegisterScreen" component={Register} />
    </Stack.Navigator>
  );
}
const mapStateToProps = function(state) {
    const states = state.reducers
    console.log(state.reducers.auth)
    return {
    isLoggedIn: states.auth.isAuth,
    }
  }
export default connect(mapStateToProps)(MainScreens);

