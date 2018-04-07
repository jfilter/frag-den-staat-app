import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { commonNavigationOptions, iconColor, iconSize } from './styles';
import FoiRequestsDetailsScreen from '../containers/foiRequests/FoiRequestsDetailsScreen';
import FoiRequestsMasterScreen from '../containers/foiRequests/FoiRequestsMasterScreen';
import FoiRequestsOnboardingScreen from '../containers/foiRequests/FoiRequestsOnboardingScreen';
import FoiRequestsPublicBodyScreen from '../containers/foiRequests/FoiRequestsPublicBodyScreen';
import FoiRequestsSingleScreen from '../containers/foiRequests/FoiRequestsSingleScreen';
import FoiRequestsWebView from '../components/foiRequests/WebView';
import I18n from '../i18n';
import PdfViewer from '../components/screens/PdfViewer';
import navigateOnce from '../utils/navigateOnce';

const FoiRequestsNavigator = StackNavigator(
  {
    FoiRequestsMaster: { screen: FoiRequestsMasterScreen },
    FoiRequestsDetails: { screen: FoiRequestsDetailsScreen },
    FoiRequestsPdfViewer: { screen: PdfViewer },
    FoiRequestsPublicBody: { screen: FoiRequestsPublicBodyScreen },
    FoiRequestsOnboarding: { screen: FoiRequestsOnboardingScreen },
    FoiRequestsSingle: { screen: FoiRequestsSingleScreen },
    FoiRequestsWebView: { screen: FoiRequestsWebView },
  },
  {
    navigationOptions: {
      ...commonNavigationOptions,
      tabBarLabel: I18n.t('requests'),
      tabBarIcon: () => <Icon size={iconSize} color={iconColor} name="home" />,
    },
  }
);

FoiRequestsNavigator.router.getStateForAction = navigateOnce(
  FoiRequestsNavigator.router.getStateForAction
);

export default FoiRequestsNavigator;
