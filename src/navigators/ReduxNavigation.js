import { BackHandler, Linking, Platform } from 'react-native';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import React from 'react';

import AppNavigator from './AppNavigator';
import { OAUTH_REDIRECT_URI } from '../globals';
import { errorAlert, successAlert } from '../utils/dropDownAlert';
import { getParams } from '../utils/oauth';
import {
  receiveOauthRedirectError,
  receiveOauthRedirectSuccess,
} from '../actions/authentication';

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
    console.log('url', url);
    if (url.startsWith(OAUTH_REDIRECT_URI)) {
      const paramString = url.substr(OAUTH_REDIRECT_URI.length);
      const params = getParams(paramString);
      console.log('params', params);

      if (params.has('error')) {
        const errorMessage =
          params.get('error') +
          (params.has('error_description')
            ? `: ${params.get('error_description')}`
            : '');
        // Right now, we don't do the error handling via redux.
        // There is just this alert and that's it. If we save the error in redux, we also have to clear it.
        // this.props.redirectError(errorMessage);
        errorAlert.getDropDown().alertWithType('error', 'Error', errorMessage);
      } else {
        successAlert
          .getDropDown()
          .alertWithType(
            'success',
            'Succesful Login',
            'You can now check out your private requests'
          );
        this.props.redirectSuccess(params);
      }
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
  dispatch,
});

const AppWithNavigationState = connect(mapStateToProps, mapDispatchToProps)(
  ReduxNavigation
);

export { AppWithNavigationState, navMiddleware };
