import { TabNavigator } from 'react-navigation';

import FoiRequestsFilterJurisdictionScreen from '../containers/foiRequests/FoiRequestsFilterJurisdictionScreen';
import FoiRequestsFilterStatusScreen from '../containers/foiRequests/FoiRequestsFilterStatusScreen';
import FoiRequestsFilterCategoryScreen from '../containers/foiRequests/FoiRequestsFilterCategoryScreen';
import FoiRequestsFilterPublicBodyScreen from '../containers/foiRequests/FoiRequestsFilterPublicBodyScreen';
import { primaryColor } from '../styles/colors';
import { tabBarConfig } from './styles';
import navigateOnce from './navigateOnce';

const FoiRequestsFilterNavigator = TabNavigator(
  {
    FoiRequestsFilterJurisdiction: {
      screen: FoiRequestsFilterJurisdictionScreen,
    },
    FoiRequestsFilterStatus: { screen: FoiRequestsFilterStatusScreen },
    FoiRequestsFilterCategory: { screen: FoiRequestsFilterCategoryScreen },
    FoiRequestsFilterPublicBody: { screen: FoiRequestsFilterPublicBodyScreen },
  },
  {
    lazy: true,
    ...tabBarConfig,
  }
);

FoiRequestsFilterNavigator.router.getStateForAction = navigateOnce(
  FoiRequestsFilterNavigator.router.getStateForAction
);

export default FoiRequestsFilterNavigator;
