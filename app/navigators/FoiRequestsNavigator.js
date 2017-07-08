import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FoiRequestsListScreen from '../containers/FoiRequestsListScreen/FoiRequestsListScreen';
import FoiRequestsDetailsScreen from '../containers/FoiRequestsDetailsScreen/FoiRequestsDetailsScreen';
import FoiRequestsFilterNavigator from './FoiRequestsFilterNavigator';
import PdfViewer from '../components/PdfViewer';

import {
  primaryColor,
  secondaryColor,
  greyDark,
  greyLight,
} from '../styles/colors';

const FoiRequestsNavigator = StackNavigator(
  {
    List: { screen: FoiRequestsListScreen },
    Details: { screen: FoiRequestsDetailsScreen },
    Filter: { screen: FoiRequestsFilterNavigator },
    FoiRequestsPdfViewer: { screen: PdfViewer },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: greyLight,
        elevation: 0, //remove shadow on Android
        shadowOpacity: 0, //remove shadow on iOS
      },
      headerTintColor: primaryColor,
      // headerTitleStyle: { color: primaryColorDark }, // change the color back to black from the overriden primary color
      headerTitleStyle: { color: secondaryColor }, // change the color back to black from the overriden primary color
      tabBarLabel: 'Requests',
      tabBarIcon: () => <Icon size={24} color={greyDark} name="list" />,
    },
  }
);

export default FoiRequestsNavigator;
