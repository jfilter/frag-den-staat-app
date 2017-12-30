import { BackHandler } from 'react-native';
import {
  NavigationActions,
  TabNavigator,
  addNavigationHelpers,
} from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import React from 'react';

import { greyLight, primaryColor } from '../globals/colors';
import NewRequestNavigator from './NewRequestNavigator';
import ProfileNavigator from './ProfileNavigator';
import SearchNavigator from './SearchNavigator';
import foiRequestsNavigator from './FoiRequestsNavigator';

export const AppNavigator = TabNavigator(
  {
    Requests: { screen: foiRequestsNavigator },
    Search: { screen: SearchNavigator },
    NewRequest: { screen: NewRequestNavigator },
    Profile: { screen: ProfileNavigator },
  },
  {
    tabBarComponent: NavigationComponent,
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    lazy: true,
    tabBarOptions: {
      bottomNavigationOptions: {
        labelColor: primaryColor,
        rippleColor: 'white',
        backgroundColor: 'white',
        style: {
          borderTopWidth: 1,
          borderTopColor: greyLight,
        },
        tabs: {
          Requests: {
            activeIcon: <Icon size={24} color={primaryColor} name="list" />,
          },
          Search: {
            activeIcon: <Icon size={24} color={primaryColor} name="search" />,
          },
          NewRequest: {
            activeIcon: <Icon size={24} color={primaryColor} name="add" />,
          },
          Profile: {
            activeIcon: (
              <Icon size={24} color={primaryColor} name="more-horiz" />
            ),
          },
        },
      },
    },
  }
);

class AppWithNavigationState extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, navigation } = this.props;

    // close the app when pressing back button on initial screen
    if (navigation.index === 0 && navigation.routes[0].index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, navigation } = this.props;

    return (
      <AppNavigator
        navigation={addNavigationHelpers({ dispatch, state: navigation })}
      />
    );
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps)(AppWithNavigationState);
