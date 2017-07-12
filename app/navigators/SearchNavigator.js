import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SearchStartScreen from '../containers/SearchStartScreen/SearchStartScreen';
import SearchResultsScreen from '../containers/SearchResultsScreen/SearchResultsScreen';
import FoiRequestsDetailsScreen from '../containers/FoiRequestsDetailsScreen/FoiRequestsDetailsScreen';
import PdfViewer from '../components/PdfViewer';

import SearchResultsRequestsScreen from '../containers/SearchResultsScreen/SearchResultsRequestsScreen';
import SearchResultsPublicBodiesScreen from '../containers/SearchResultsScreen/SearchResultsPublicBodiesScreen';

import { commonNavigationOptions, iconColor, iconSize } from './styles';

const SearchResultsNavigator = TabNavigator(
  {
    SearchResultsRequests: { screen: SearchResultsRequestsScreen },
    SearchResultsPublicBodies: { screen: SearchResultsPublicBodiesScreen },
  },
  {
    lazy: true,
    backBehavior: 'none',
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: 'blue',
      // headerTitleStyle: { color: 'black' }, // change the color back to black from the overriden primary color
      // tabBarLabel: 'Requests',
      // tabBarIcon: () => <Icon size={24} color="black" name="list" />,
    },
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
