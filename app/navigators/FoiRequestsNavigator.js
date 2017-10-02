import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import {
  commonNavigationOptions,
  iconColor,
  iconSize,
  tabBarConfig,
} from './styles';
import FoiRequestsDetailsScreen from '../containers/foiRequests/FoiRequestsDetailsScreen';
import FoiRequestsFilterCategoryScreen from '../containers/foiRequests/FoiRequestsFilterCategoryScreen';
import FoiRequestsFilterJurisdictionScreen from '../containers/foiRequests/FoiRequestsFilterJurisdictionScreen';
import FoiRequestsFilterStatusScreen from '../containers/foiRequests/FoiRequestsFilterStatusScreen';
import FoiRequestsIntroScreen from '../containers/foiRequests/FoiRequestsIntroScreen';
import FoiRequestsMasterScreen from '../containers/foiRequests/FoiRequestsMasterScreen';
import FoiRequestsPublicBodyScreen from '../containers/foiRequests/FoiRequestsPublicBodyScreen';
import PdfViewer from '../components/library/PdfViewer';
import navigateOnce from '../utils/navigateOnce';

const FoiRequestsFilterNavigator = TabNavigator(
  {
    FoiRequestsFilterStatus: { screen: FoiRequestsFilterStatusScreen },
    FoiRequestsFilterJurisdiction: {
      screen: FoiRequestsFilterJurisdictionScreen,
    },
    FoiRequestsFilterCategory: { screen: FoiRequestsFilterCategoryScreen },
    // FoiRequestsFilterPublicBody: { screen: FoiRequestsFilterPublicBodyScreen }, TODO: I am note quite sure if the app needs this additional filter. Maybe it's already enough. If it's the case, delete the failes
  },
  {
    lazy: true,
    ...tabBarConfig,
  }
);

const FoiRequestsNavigator = StackNavigator(
  {
    FoiRequestsMaster: { screen: FoiRequestsMasterScreen },
    FoiRequestsDetails: { screen: FoiRequestsDetailsScreen },
    FoiRequestsFilter: { screen: FoiRequestsFilterNavigator },
    FoiRequestsPdfViewer: { screen: PdfViewer },
    FoiRequestsPublicBody: { screen: FoiRequestsPublicBodyScreen },
    FoiRequestsIntro: { screen: FoiRequestsIntroScreen },
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
