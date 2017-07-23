import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addNavigationHelpers,
  TabNavigator,
  NavigationActions,
} from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProfileNavigator from './ProfileNavigator';
import foiRequestsNavigator from './FoiRequestsNavigator';
import SearchNavigator from './SearchNavigator';
import { primaryColor, greyDark, greyLight } from '../styles/colors';

class NewRequest extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'New',
    tabBarIcon: () => <Icon size={24} color={greyDark} name="add" />,
  };

  render() {
    return <View />;
  }
}

export const AppNavigator = TabNavigator(
  {
    Requests: { screen: foiRequestsNavigator },
    Search: { screen: SearchNavigator },
    NewRequest: { screen: NewRequest },
    Profile: { screen: ProfileNavigator },
  },
  {
    tabBarComponent: NavigationComponent,
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
            activeIcon: <Icon size={24} color={primaryColor} name="person" />,
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
