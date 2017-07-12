import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SearchStartScreen from '../containers/SearchStartScreen/SearchStartScreen';
import SearchResultsScreen from '../containers/SearchResultsScreen/SearchResultsScreen';
import FoiRequestsDetailsScreen from '../containers/FoiRequestsDetailsScreen/FoiRequestsDetailsScreen';
import PdfViewer from '../components/PdfViewer';

import { commonNavigationOptions, iconColor, iconSize } from './styles';

const SearchNavigator = StackNavigator(
  {
    SearchStart: { screen: SearchStartScreen },
    SearchResults: { screen: SearchResultsScreen },
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
