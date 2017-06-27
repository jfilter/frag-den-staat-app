import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FoiaRequestsListScreen from '../containers/FoiaRequestsListScreen';
// import FoiaRequestsDetailsScreen from '../containers/FoiaRequestsListScreen';

const FoiaRequestsNavigator = StackNavigator(
  {
    List: { screen: FoiaRequestsListScreen },
    // Detail: { screen: ProfileLoginScreen },
  },
  {
    navigationOptions: {
      tabBarLabel: 'Requests',
      tabBarIcon: () => <Icon size={24} color="black" name="list" />,
    },
  }
);

export default FoiaRequestsNavigator;
