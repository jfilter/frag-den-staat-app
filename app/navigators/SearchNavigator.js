import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SearchStartScreen from '../containers/search/SearchStartScreen';
import FoiRequestsDetailsScreen from '../containers/FoiRequestsDetailsScreen/FoiRequestsDetailsScreen';
import PdfViewer from '../components/PdfViewer';

import SearchResultsFoiRequestsScreen from '../containers/search/SearchResultsFoiRequestsScreen';
import SearchResultsPublicBodiesScreen from '../containers/search/SearchResultsPublicBodiesScreen';

import {
  commonNavigationOptions,
  searchTabBarOptions,
  iconColor,
  iconSize,
} from './styles';

const SearchResultsNavigator = TabNavigator(
  {
    SearchResultsFoiRequests: { screen: SearchResultsFoiRequestsScreen },
    SearchResultsPublicBodies: { screen: SearchResultsPublicBodiesScreen },
  },
  {
    // lazy: true,
    backBehavior: 'none',
    tabBarPosition: 'top',
    tabBarOptions: { ...searchTabBarOptions, showIcon: true },
  }
);

const SearchNavigator = StackNavigator(
  {
    SearchStart: { screen: SearchStartScreen },
    SearchResults: { screen: SearchResultsNavigator },
    SearchResultsSingle: { screen: FoiRequestsDetailsScreen },
    SearchResultsPdf: { screen: PdfViewer },
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
