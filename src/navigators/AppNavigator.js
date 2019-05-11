import { Icon } from 'react-native-elements';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import React from 'react';

import { greyDark, greyLight, primaryColor } from '../globals/colors';
import NewRequestNavigator from './NewRequestNavigator';
import ProfileNavigator from './ProfileNavigator';
import SearchNavigator from './SearchNavigator';
import foiRequestsNavigator from './FoiRequestsNavigator';

const AppNavigator = createMaterialBottomTabNavigator(
  {
    Requests: {
      screen: foiRequestsNavigator,
      navigationOptions: state => {
        // hide bottom on Onboarding screen
        if (
          state.navigation.state.routes[0].routes.length === 2 &&
          state.navigation.state.routes[0].routes[1].routeName ==
            'FoiRequestsOnboarding'
        ) {
          return {
            tabBarIcon: ({ tintColor }) => (
              <Icon size={24} color={tintColor} name="home" />
            ),
            tabBarVisible: false,
          };
        }
        return {
          tabBarIcon: ({ tintColor }) => (
            <Icon size={24} color={tintColor} name="home" />
          ),
        };
      },
    },
    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon size={24} color={tintColor} name="search" />
        ),
      },
    },
    NewRequest: {
      screen: NewRequestNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon size={24} color={tintColor} name="add" />
        ),
      },
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon size={24} color={tintColor} name="more-horiz" />
        ),
      },
    },
  },
  {
    activeColor: primaryColor,
    inactiveColor: greyDark,
    barStyle: {
      backgroundColor: 'white',
      elevation: 0,
      borderTopWidth: 1,
      borderColor: greyLight,
    },
  }
);

export default AppNavigator;
