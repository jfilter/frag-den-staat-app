import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { commonNavigationOptions, iconColor, iconSize } from './styles';
import FoiRequestsFilterNavigator from './FoiRequestsFilterNavigator';
import FoiRequestsListScreen from '../containers/foiRequests/FoiRequestsListScreen';
import FoiRequestsPublicBodyScreen from '../containers/foiRequests/FoiRequestsPublicBodyScreen';
import FoiRequestsSingleScreen from '../containers/foiRequests/FoiRequestsSingleScreen';
import PdfViewer from '../components/PdfViewer';
import navigateOnce from './navigateOnce';

const FoiRequestsNavigator = StackNavigator(
  {
    FoiRequestsList: { screen: FoiRequestsListScreen },
    FoiRequestsSingle: { screen: FoiRequestsSingleScreen },
    FoiRequestsFilter: { screen: FoiRequestsFilterNavigator },
    FoiRequestsPdfViewer: { screen: PdfViewer },
    FoiRequestsPublicBody: { screen: FoiRequestsPublicBodyScreen },
  },
  {
    navigationOptions: {
      ...commonNavigationOptions,
      tabBarLabel: 'Requests',
      tabBarIcon: () => <Icon size={iconSize} color={iconColor} name="list" />,
    },
  }
);

FoiRequestsNavigator.router.getStateForAction = navigateOnce(
  FoiRequestsNavigator.router.getStateForAction
);

export default FoiRequestsNavigator;
