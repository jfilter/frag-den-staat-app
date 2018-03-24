import { Icon } from 'react-native-elements';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator, DrawerNavigator } from 'react-navigation';
import React from 'react';

import { greyLight, primaryColor } from '../globals/colors';
import FoiRequestsDrawer from '../containers/foiRequests/FoiRequestsDrawer';
import NewRequestNavigator from './NewRequestNavigator';
import ProfileNavigator from './ProfileNavigator';
import SearchNavigator from './SearchNavigator';
import foiRequestsNavigator from './FoiRequestsNavigator';

const AppNavigator = TabNavigator(
  {
    Requests: { screen: foiRequestsNavigator },
    Search: { screen: SearchNavigator },
    NewRequest: { screen: NewRequestNavigator },
    Profile: { screen: ProfileNavigator },
  },
  {
    tabBarComponent: NavigationComponent,
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    lazy: true,
    tabBarOptions: {
      bottomNavigationOptions: {
        labelColor: primaryColor,
        rippleColor: 'white',
        backgroundColor: 'white',
        style: {
          borderTopWidth: 1,
          borderTopColor: greyLight,
        },
        tabs: {
          Requests: {
            activeIcon: <Icon size={24} color={primaryColor} name="home" />,
          },
          Search: {
            activeIcon: <Icon size={24} color={primaryColor} name="search" />,
          },
          NewRequest: {
            activeIcon: <Icon size={24} color={primaryColor} name="add" />,
          },
          Profile: {
            activeIcon: (
              <Icon size={24} color={primaryColor} name="more-horiz" />
            ),
          },
        },
      },
    },
  }
);

const Drawer = DrawerNavigator(
  {
    AppNavigator: { screen: AppNavigator },
  },
  {
    contentComponent: FoiRequestsDrawer,
  }
);

export default Drawer;
