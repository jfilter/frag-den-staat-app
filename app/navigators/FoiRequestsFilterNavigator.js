import { TabNavigator } from 'react-navigation';

import FoiRequestsFilterJurisdictionScreen from '../containers/foiRequests/FoiRequestsFilterJurisdictionScreen';
import FoiRequestsFilterStatusScreen from '../containers/foiRequests/FoiRequestsFilterStatusScreen';
import FoiRequestsFilterCategoryScreen from '../containers/foiRequests/FoiRequestsFilterCategoryScreen';
// import FoiRequestsFilterPublicBodyScreen from '../containers/foiRequests/FoiRequestsFilterPublicBodyScreen';
import { tabBarConfig } from './styles';

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

export default FoiRequestsFilterNavigator;
