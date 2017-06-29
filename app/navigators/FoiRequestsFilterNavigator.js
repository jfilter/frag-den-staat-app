import React from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FoiRequestsFilterJurisdictionScreen from '../containers/FoiRequestsFilterJurisdictionScreen';
import FoiRequestsFilterStatusScreen from '../containers/FoiRequestsFilterStatusScreen';
import FoiRequestsFilterCategoryScreen from '../containers/FoiRequestsFilterCategoryScreen';
import { primaryColor } from '../styles/colors';

const FoiRequestsFilterNavigator = TabNavigator(
  {
    Jurisdiction: { screen: FoiRequestsFilterJurisdictionScreen },
    Status: { screen: FoiRequestsFilterStatusScreen },
    Category: { screen: FoiRequestsFilterCategoryScreen },
  },
  {
    lazy: true,
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: primaryColor,
      // headerTitleStyle: { color: 'black' }, // change the color back to black from the overriden primary color
      // tabBarLabel: 'Requests',
      // tabBarIcon: () => <Icon size={24} color="black" name="list" />,
    },
  }
);

export default FoiRequestsFilterNavigator;
