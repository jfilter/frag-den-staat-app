import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { commonNavigationOptions, iconColor, iconSize } from './styles';
import ProfileAboutApp from '../components/profile/ProfileAboutApp';
import ProfileAboutFOI from '../components/profile/ProfileAboutFOI';
import ProfileContact from '../components/profile/ProfileContact';
import ProfileDataUsePolicy from '../components/profile/ProfileDataUsePolicy';
import ProfileFAQDetails from '../containers/profile/ProfileFAQDetails';
import ProfileFAQMaster from '../containers/profile/ProfileFAQMaster';
import ProfileFeedback from '../components/profile/ProfileFeedback';
import ProfileIntroVideo from '../components/profile/ProfileIntroVideo';
import ProfileLoginScreen from '../containers/profile/ProfileLoginScreen';
import ProfileStartScreen from '../containers/profile/ProfileStartScreen';
import ProfileTermsOfUse from '../components/profile/ProfileTermsOfUse';
import navigateOnce from './navigateOnce';

const ProfileNavigator = StackNavigator(
  {
    ProfileStart: { screen: ProfileStartScreen },
    ProfileLogin: { screen: ProfileLoginScreen },
    ProfileIntroVideo: { screen: ProfileIntroVideo },
    ProfileAboutApp: { screen: ProfileAboutApp },
    ProfileAboutFOI: { screen: ProfileAboutFOI },
    ProfileFAQMaster: { screen: ProfileFAQMaster },
    ProfileFAQDetails: { screen: ProfileFAQDetails },
    ProfileContact: { screen: ProfileContact },
    ProfileFeedback: { screen: ProfileFeedback },
    ProfileDataUsePolicy: { screen: ProfileDataUsePolicy },
    ProfileTermsOfUse: { screen: ProfileTermsOfUse },
  },
  {
    navigationOptions: {
      ...commonNavigationOptions,
      tabBarLabel: 'Profile',
      tabBarIcon: () => (
        <Icon size={iconSize} color={iconColor} name="person" />
      ),
    },
  }
);

ProfileNavigator.router.getStateForAction = navigateOnce(
  ProfileNavigator.router.getStateForAction
);

export default ProfileNavigator;
