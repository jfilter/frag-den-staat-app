import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FoiRequestsListScreen from '../containers/foiRequests/FoiRequestsListScreen';
import FoiRequestsSingleScreen from '../containers/foiRequests/FoiRequestsSingleScreen';
import FoiRequestsFilterNavigator from './FoiRequestsFilterNavigator';
import PdfViewer from '../components/PdfViewer';

import { commonNavigationOptions, iconColor, iconSize } from './styles';

const FoiRequestsNavigator = StackNavigator(
  {
    FoiRequestsList: { screen: FoiRequestsListScreen },
    FoiRequestsSingle: { screen: FoiRequestsSingleScreen },
    FoiRequestsFilter: { screen: FoiRequestsFilterNavigator },
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
