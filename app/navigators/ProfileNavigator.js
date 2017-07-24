import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { commonNavigationOptions, iconColor, iconSize } from './styles';
import ProfileAboutApp from '../components/profile/ProfileAboutApp';
import ProfileAboutFOI from '../components/profile/ProfileAboutFOI';
import ProfileContact from '../components/profile/ProfileContact';
import ProfileDataUsePolicy from '../components/profile/ProfileDataUsePolicy';
import ProfileFAQ from '../components/profile/ProfileFAQ';
import ProfileLoginScreen from '../components/profile/ProfileLoginScreen';
import ProfileStartScreen from '../containers/profile/ProfileStartScreen';
import navigateOnce from './navigateOnce';

const ProfileNavigator = StackNavigator(
  {
    ProfileStart: { screen: ProfileStartScreen },
    ProfileLogin: { screen: ProfileLoginScreen },
    ProfileAboutApp: { screen: ProfileAboutApp },
    ProfileAboutFOI: { screen: ProfileAboutFOI },
    ProfileFAQ: { screen: ProfileFAQ },
    ProfileContact: { screen: ProfileContact },
    ProfileDataUsePolicy: { screen: ProfileDataUsePolicy },
  },
  {
    navigationOptions: {
      ...commonNavigationOptions,
      tabBarLabel: 'Profile',
      tabBarIcon: () =>
        <Icon size={iconSize} color={iconColor} name="person" />,
    },
  }
);

ProfileNavigator.router.getStateForAction = navigateOnce(
  ProfileNavigator.router.getStateForAction
);

export default ProfileNavigator;
