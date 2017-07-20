import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SearchStartScreen from '../containers/search/SearchStartScreen';
import SearchFoiRequestSingleScreen from '../containers/search/SearchFoiRequestSingleScreen';
import PdfViewer from '../components/PdfViewer';

import SearchResultsFoiRequestsScreen from '../containers/search/SearchResultsFoiRequestsScreen';
import SearchResultsPublicBodiesScreen from '../containers/search/SearchResultsPublicBodiesScreen';

import {
  commonNavigationOptions,
  tabBarConfig,
  iconColor,
  iconSize,
} from './styles';

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

export default SearchNavigator;
