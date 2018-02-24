import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { commonNavigationOptions, iconColor, iconSize } from './styles';
import FoiRequestsDetailsScreen from '../containers/foiRequests/FoiRequestsDetailsScreen';
import FoiRequestsIntroScreen from '../containers/foiRequests/FoiRequestsIntroScreen';
import FoiRequestsMasterScreen from '../containers/foiRequests/FoiRequestsMasterScreen';
import FoiRequestsPublicBodyScreen from '../containers/foiRequests/FoiRequestsPublicBodyScreen';
import PdfViewer from '../components/screens/PdfViewer';
import navigateOnce from '../utils/navigateOnce';
import I18n from '../i18n';

const FoiRequestsNavigator = StackNavigator(
  {
    FoiRequestsMaster: { screen: FoiRequestsMasterScreen },
    FoiRequestsDetails: { screen: FoiRequestsDetailsScreen },
    FoiRequestsPdfViewer: { screen: PdfViewer },
    FoiRequestsPublicBody: { screen: FoiRequestsPublicBodyScreen },
    FoiRequestsIntro: { screen: FoiRequestsIntroScreen },
  },
  {
    navigationOptions: {
      ...commonNavigationOptions,
      tabBarLabel: I18n.t('requests'),
      tabBarIcon: () => <Icon size={iconSize} color={iconColor} name="list" />,
    },
  }
);

FoiRequestsNavigator.router.getStateForAction = navigateOnce(
  FoiRequestsNavigator.router.getStateForAction
);

export default FoiRequestsNavigator;
