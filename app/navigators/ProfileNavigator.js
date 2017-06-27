import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProfileLoginScreen from '../components/ProfileLoginScreen';
import ProfileMainScreen from '../components/ProfileMainScreen';

const ProfileNavigator = StackNavigator({
    Main: { screen: ProfileMainScreen },
    Login: { screen: ProfileLoginScreen },
  }, { navigationOptions: {
    tabBarLabel: 'Profile',
    tabBarIcon: () => (<Icon size={24} color="black" name="person" />),
  },
});

export default ProfileNavigator;
