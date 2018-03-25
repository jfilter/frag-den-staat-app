import { BackHandler, Linking, Platform } from 'react-native';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import React from 'react';

import {
  GET_REQUEST_ID_HOSTNAME,
  OAUTH_REDIRECT_URI,
  ORIGIN,
} from '../globals';
import { errorAlert, successAlert } from '../utils/dropDownAlert';

import {
  getUserInformation,
  receiveOauthRedirectError,
  oauthUpdateToken,
} from '../actions/authentication';
import { loadToken, saveToken } from '../utils/secureStorage';
import AppNavigator from './AppNavigator';
import { fetchInitialToken } from '../utils/oauth';

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation
);
const addListener = createReduxBoundAddListener('root');

class ReduxNavigation extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

    // universal linking, when app was closed
    // (and all android calls)
    Linking.getInitialURL().then(url => {
      if (url !== null) this.urlRouter(url);
    });

    // deep linking (and all ios)
    Linking.addEventListener('url', event => this.urlRouter(event.url));

    loadToken().then(
      token =>
        token !== null &&
        Object.keys(token).length !== 0 &&
        this.props.updateToken(token) &&
        this.props.getUserInformation()
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    Linking.removeEventListener('url', this.handleOpenURLiOS);
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

  urlRouter = url => {
    if (url.startsWith(OAUTH_REDIRECT_URI)) {
      this.handleLoginRedirect(url);
    } else {
      this.navigate(url);
    }
  };

  handleLoginRedirect = url => {
    // 1. go back to page where clicked login (on iOS)
    if (Platform.OS === 'ios') this.props.dispatch(NavigationActions.back());
    fetchInitialToken(url)
      .then(token => {
        // 2. show message on top
        successAlert
          .getDropDown()
          .alertWithType('success', 'Succesful', 'You successfully logged in.');

        // 3. update token in redux store
        this.props.updateToken(token);

        // 4. fetch information about user from server
        this.props.getUserInformation();

        // 5. persists token
        saveToken(token);
      })
      .catch(error =>
        errorAlert.getDropDown().alertWithType('error', 'Error', error.message)
      );
  };

  navigate = async url => {
    const { dispatch } = this.props;

    // difference for deep linking and unviversal linking
    let route;
    if (url.startsWith(ORIGIN)) {
      route = url.replace(`${ORIGIN}/`, '');
    } else {
      route = url.replace(/.*?:\/\//g, '');
    }
    const routeName = route.split('/')[0];

    // a for anfrage
    if (routeName === 'a') {
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      dispatch(
        NavigationActions.navigate({
          routeName: 'FoiRequestsSingle',
          params: { foiRequestId: id },
        })
      );
    }

    if (routeName === 'anfrage') {
      const res = await fetch(`${GET_REQUEST_ID_HOSTNAME}/${route}`);
      const id = await res.json();
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
  updateToken: token => dispatch(oauthUpdateToken(token)),
  redirectError: errorMessage =>
    dispatch(receiveOauthRedirectError(errorMessage)),
  getUserInformation: () => dispatch(getUserInformation()),
  dispatch,
});

const AppWithNavigationState = connect(mapStateToProps, mapDispatchToProps)(
  ReduxNavigation
);

export { AppWithNavigationState, navMiddleware };
