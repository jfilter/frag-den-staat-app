import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProfileNavigator from './ProfileNavigator';
import FoiaRequestsNavigator from './FoiaRequestsNavigator';
import { primaryColor } from '../styles/colors';

// class Requests extends React.Component {
//   static navigationOptions = {
//     tabBarLabel: 'Requests',
//     tabBarIcon: () => (<Icon size={24} color="black" name="list" />)
//   }

//   render() { return <View></View> }
// }

class Search extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: () => (<Icon size={24} color="black" name="search" />)
  }

  render() { return <View></View> }
}

class NewRequest extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'New',
    tabBarIcon: () => (<Icon size={24} color="black" name="add" />)
  }

  render() { return <View></View> }
}

export const AppNavigator = TabNavigator({
  Requests: { screen: FoiaRequestsNavigator },
  Search: { screen: Search },
  NewRequest: { screen: NewRequest },
  Profile: { screen: ProfileNavigator },
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: primaryColor,
      rippleColor: 'white',
      backgroundColor: '#EEEEEE',
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
});

const AppWithNavigationState = ({ dispatch, navigation }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: navigation })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps)(AppWithNavigationState);
