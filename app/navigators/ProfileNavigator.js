import React from 'react';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from '../components/ProfileLoginScreen';
import MainScreen from '../components/ProfileMainScreen';
import WelcomeScreen from '../components/ProfileWelcomeScreen';

const ProfileNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen },
  Welcome: { screen: WelcomeScreen },
}, { navigationOptions: {
    tabBarLabel: 'Profile',
    tabBarIcon: () => (<Icon size={24} color="black" name="person" />)
  }
});

export default ProfileNavigator;
