import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from '../components/ProfileLoginScreen';
import MainScreen from '../components/ProfileMainScreen';

const ProfileNavigator = StackNavigator({
  Main: { screen: MainScreen },
  Login: { screen: LoginScreen },
}, { navigationOptions: {
  tabBarLabel: 'Profile',
  tabBarIcon: () => (<Icon size={24} color="black" name="person" />),
},
});

export default ProfileNavigator;
