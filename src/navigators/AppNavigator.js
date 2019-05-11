import { Icon } from 'react-native-elements';
import { createDrawerNavigator } from 'react-navigation';
import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { greyLight, primaryColor, grey, greyDark } from '../globals/colors';
import FoiRequestsDrawer from '../containers/foiRequests/FoiRequestsDrawer';
import NewRequestNavigator from './NewRequestNavigator';
import ProfileNavigator from './ProfileNavigator';
import SearchNavigator from './SearchNavigator';
import foiRequestsNavigator from './FoiRequestsNavigator';

const AppNavigator = createMaterialBottomTabNavigator(
  {
    Requests: {
      screen: foiRequestsNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon size={24} color={tintColor} name="home" />
        ),
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

const Drawer = createDrawerNavigator(
  {
    AppNavigator: { screen: AppNavigator },
  },
  {
    contentComponent: FoiRequestsDrawer,
    edgeWidth: 0, // don't swipe in
  }
);

export default Drawer;
