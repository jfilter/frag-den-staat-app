import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProfileLoginScreen from '../components/ProfileLoginScreen';
import ProfileMainScreen from '../components/ProfileMainScreen';
import { greyDark } from '../styles/colors';
import navigateOnce from './navigateOnce';

const ProfileNavigator = StackNavigator(
  {
    Main: { screen: ProfileMainScreen },
    Login: { screen: ProfileLoginScreen },
  },
  {
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: () => <Icon size={24} color={greyDark} name="person" />,
    },
  }
);

ProfileNavigator.router.getStateForAction = navigateOnce(
  ProfileNavigator.router.getStateForAction
);

export default ProfileNavigator;
