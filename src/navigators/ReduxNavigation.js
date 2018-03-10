import { BackHandler, Linking, Platform } from 'react-native';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import React from 'react';

import { errorAlert, successAlert } from '../utils/dropDownAlert';
import { OAUTH_REDIRECT_URI } from '../globals';

import {
  getUserInformation,
  receiveOauthRedirectError,
  receiveOauthRedirectSuccess,
} from '../actions/authentication';
import { loadToken, saveToken } from '../utils/secureStorage';
import AppNavigator from './AppNavigator';
import { handleRedirectAfterLoginClick } from '../utils/oauth';

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation
);
const addListener = createReduxBoundAddListener('root');

class ReduxNavigation extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
    loadToken().then(
      token =>
        token !== null &&
        this.props.redirectSuccess(token) &&
        this.props.getUserInformation()
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    Linking.removeEventListener('url', this.handleOpenURL);
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

  handleOpenURL = event => {
    const { url } = event;
    if (url.startsWith(OAUTH_REDIRECT_URI)) {
      handleRedirectAfterLoginClick(url)
        .then(token => {
          successAlert
            .getDropDown()
            .alertWithType(
              'success',
              'Succesful',
              'You successfully logged in.'
            );
          this.props.redirectSuccess(token);
          this.props.getUserInformation();
          saveToken(token);
        })
        .catch(error =>
          errorAlert
            .getDropDown()
            .alertWithType('error', 'Error', error.message)
        );
    } else {
      this.navigate(event.url);
    }
  };

  navigate = url => {
    const { dispatch } = this.props;
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];

    // a for anfrage
    if (routeName === 'a') {
      dispatch(
        NavigationActions.navigate({
          routeName: 'FoiRequestsSingle',
          params: { foiRequestId: id },
        })
      );
    }
  };

  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
});

const mapDispatchToProps = dispatch => ({
  redirectSuccess: params => dispatch(receiveOauthRedirectSuccess(params)),
  redirectError: errorMessage =>
    dispatch(receiveOauthRedirectError(errorMessage)),
  getUserInformation: () => dispatch(getUserInformation()),
  dispatch,
});

const AppWithNavigationState = connect(mapStateToProps, mapDispatchToProps)(
  ReduxNavigation
);

export { AppWithNavigationState, navMiddleware };
