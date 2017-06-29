import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FoiRequestsListScreen from '../containers/FoiRequestsListScreen';
import FoiRequestDetailsScreen from '../containers/FoiRequestDetailsScreen';
import { primaryColor } from '../styles/colors';

const FoiRequestsNavigator = StackNavigator(
  {
    List: { screen: FoiRequestsListScreen },
    Details: { screen: FoiRequestDetailsScreen },
  },
  {
    navigationOptions: {
      headerTintColor: primaryColor,
      headerTitleStyle: { color: 'black' }, // change the color back to black from the overriden primary color
      tabBarLabel: 'Requests',
      tabBarIcon: () => <Icon size={24} color="black" name="list" />,
    },
  }
);

export default FoiRequestsNavigator;
