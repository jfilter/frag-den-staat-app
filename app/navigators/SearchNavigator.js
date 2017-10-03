import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import {
  commonNavigationOptions,
  tabBarConfig,
  iconColor,
  iconSize,
} from './styles';
import PdfViewer from '../components/library/PdfViewer';
import SearchFoiRequestDetailsScreen from '../containers/search/SearchFoiRequestDetailsScreen';
import SearchPublicBodyDetailsScreen from '../containers/search/SearchPublicBodyDetailsScreen';
import SearchResultsFoiRequestsMasterScreen from '../containers/search/SearchResultsFoiRequestsMasterScreen';
import SearchResultsPublicBodiesMasterScreen from '../containers/search/SearchResultsPublicBodiesMasterScreen';
import SearchStartScreen from '../containers/search/SearchStartScreen';
import navigateOnce from '../utils/navigateOnce';
import I18n from '../i18n';

const SearchResultsNavigator = TabNavigator(
  {
    SearchResultsFoiRequestsMaster: {
      screen: SearchResultsFoiRequestsMasterScreen,
    },
    SearchResultsPublicBodiesMaster: {
      screen: SearchResultsPublicBodiesMasterScreen,
    },
  },
  { ...tabBarConfig }
);

const SearchNavigator = StackNavigator(
  {
    SearchStart: { screen: SearchStartScreen },
    SearchResults: { screen: SearchResultsNavigator },
    SearchFoiRequestDetails: { screen: SearchFoiRequestDetailsScreen },
    SearchPublicBodyDetails: { screen: SearchPublicBodyDetailsScreen },
    SearchPdfViewer: { screen: PdfViewer },
  },
  {
    navigationOptions: {
      ...commonNavigationOptions,
      tabBarLabel: I18n.t('search'),
      tabBarIcon: () => (
        <Icon size={iconSize} color={iconColor} name="search" />
      ),
    },
  }
);

SearchNavigator.router.getStateForAction = navigateOnce(
  SearchNavigator.router.getStateForAction
);

export default SearchNavigator;
