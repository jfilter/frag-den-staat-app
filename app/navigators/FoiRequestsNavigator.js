import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FoiRequestsListScreen from '../containers/FoiRequestsListScreen/FoiRequestsListScreen';
import FoiRequestsDetailsScreen from '../containers/FoiRequestsDetailsScreen/FoiRequestsDetailsScreen';
import FoiRequestsFilterNavigator from './FoiRequestsFilterNavigator';
import PdfViewer from '../components/PdfViewer';

import { commonNavigationOptions, iconColor, iconSize } from './styles';

const FoiRequestsNavigator = StackNavigator(
  {
    List: { screen: FoiRequestsListScreen },
    Details: { screen: FoiRequestsDetailsScreen },
    Filter: { screen: FoiRequestsFilterNavigator },
    FoiRequestsPdfViewer: { screen: PdfViewer },
  },
  {
    navigationOptions: {
      ...commonNavigationOptions,
      tabBarLabel: 'Requests',
      tabBarIcon: () => <Icon size={iconSize} color={iconColor} name="list" />,
    },
  }
);

export default FoiRequestsNavigator;
