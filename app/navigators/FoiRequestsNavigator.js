import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FoiRequestsListScreen from '../containers/FoiRequestsListScreen';
// import foiRequestsDetailsScreen from '../containers/foiRequestsListScreen';

const FoiRequestsNavigator = StackNavigator(
  {
    List: { screen: FoiRequestsListScreen },
    // Detail: { screen: ProfileLoginScreen },
  },
  {
    navigationOptions: {
      tabBarLabel: 'Requests',
      tabBarIcon: () => <Icon size={24} color="black" name="list" />,
    },
  }
);

export default FoiRequestsNavigator;
