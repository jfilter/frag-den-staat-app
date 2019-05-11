import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { commonNavigationOptions, iconColor, iconSize } from './styles';
import FoiRequestsDetailsScreen from '../containers/foiRequests/FoiRequestsDetailsScreen';
import FoiRequestsDrawer from '../containers/foiRequests/FoiRequestsDrawer';
import FoiRequestsMasterScreen from '../containers/foiRequests/FoiRequestsMasterScreen';
import FoiRequestsOnboardingScreen from '../containers/foiRequests/FoiRequestsOnboardingScreen';
import FoiRequestsPublicBodyScreen from '../containers/foiRequests/FoiRequestsPublicBodyScreen';
import FoiRequestsSingleScreen from '../containers/foiRequests/FoiRequestsSingleScreen';
import FoiRequestsWebView from '../components/foiRequests/WebView';
import I18n from '../i18n';
import PdfViewer from '../components/screens/PdfViewer';

const FoiRequestsNavigator = createStackNavigator(
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

const Drawer = createDrawerNavigator(
  {
    AppNavigator: { screen: FoiRequestsNavigator },
  },
  {
    contentComponent: FoiRequestsDrawer,
    edgeWidth: 0, // don't swipe in
  }
);

export default Drawer;
