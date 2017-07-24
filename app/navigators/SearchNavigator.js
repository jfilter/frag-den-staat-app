import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import {
  commonNavigationOptions,
  tabBarConfig,
  iconColor,
  iconSize,
} from './styles';
import PdfViewer from '../components/PdfViewer';
import SearchFoiRequestSingleScreen from '../containers/search/SearchFoiRequestSingleScreen';
import SearchPublicBodySingleScreen from '../containers/search/SearchPublicBodySingleScreen';
import SearchResultsFoiRequestsScreen from '../containers/search/SearchResultsFoiRequestsScreen';
import SearchResultsPublicBodiesScreen from '../containers/search/SearchResultsPublicBodiesScreen';
import SearchStartScreen from '../containers/search/SearchStartScreen';
import navigateOnce from './navigateOnce';

const SearchResultsNavigator = TabNavigator(
  {
    SearchResultsFoiRequests: { screen: SearchResultsFoiRequestsScreen },
    SearchResultsPublicBodies: { screen: SearchResultsPublicBodiesScreen },
  },
  { ...tabBarConfig }
);

const SearchNavigator = StackNavigator(
  {
    SearchStart: { screen: SearchStartScreen },
    SearchResults: { screen: SearchResultsNavigator },
    SearchFoiRequestSingle: { screen: SearchFoiRequestSingleScreen },
    SearchPublicBodySingle: { screen: SearchPublicBodySingleScreen },
    SearchPdfViewer: { screen: PdfViewer },
  },
  {
    navigationOptions: {
      ...commonNavigationOptions,
      tabBarLabel: 'Search',
      tabBarIcon: () =>
        <Icon size={iconSize} color={iconColor} name="search" />,
    },
  }
);

SearchNavigator.router.getStateForAction = navigateOnce(
  SearchNavigator.router.getStateForAction
);

export default SearchNavigator;
