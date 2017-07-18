import { TabNavigator } from 'react-navigation';

import FoiRequestsFilterJurisdictionScreen from '../containers/foiRequests/FoiRequestsFilterJurisdictionScreen';
import FoiRequestsFilterStatusScreen from '../containers/foiRequests/FoiRequestsFilterStatusScreen';
import FoiRequestsFilterCategoryScreen from '../containers/foiRequests/FoiRequestsFilterCategoryScreen';
import { primaryColor } from '../styles/colors';

const FoiRequestsFilterNavigator = TabNavigator(
  {
    Jurisdiction: { screen: FoiRequestsFilterJurisdictionScreen },
    Status: { screen: FoiRequestsFilterStatusScreen },
    Category: { screen: FoiRequestsFilterCategoryScreen },
  },
  {
    lazy: true,
    backBehavior: 'none',
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: primaryColor,
      // headerTitleStyle: { color: 'black' }, // change the color back to black from the overriden primary color
      // tabBarLabel: 'Requests',
      // tabBarIcon: () => <Icon size={24} color="black" name="list" />,
    },
  }
);

export default FoiRequestsFilterNavigator;
