import { BackHandler, Linking, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer,
} from 'react-navigation-redux-helpers';
import React from 'react';
import BackgroundFetch from 'react-native-background-fetch';

import {
  GET_REQUEST_ID_HOSTNAME,
  OAUTH_REDIRECT_URI,
  ORIGIN,
  FDROID,
} from '../globals';
import I18n from '../i18n';

import { errorAlert, successAlert } from '../utils/dropDownAlert';
import {
  getUserInformation,
  receiveOauthRedirectError,
  oauthUpdateToken,
} from '../actions/authentication';
import { loadToken, saveToken } from '../utils/secureStorage';
import AppNavigator from './AppNavigator';
import { fetchInitialToken } from '../utils/oauth';
import { searchUpdateAlertMatchesAction } from '../actions/search';
import { localNotif, setUp } from '../utils/notifications';

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const navMiddleware = createReactNavigationReduxMiddleware(
  state => state.navigation
);

const App = createReduxContainer(AppNavigator, 'root');

class ReduxNavigation extends React.Component {
  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

    // universal linking, when app was closed
    // (and all android calls)
    Linking.getInitialURL().then(url => {
      if (url !== null) this.urlRouter(url);
    });

    // deep linking (and all ios)
    Linking.addEventListener('url', this.handleUrlEvent);

    const token = await loadToken();
    if (token !== null && Object.keys(token).length !== 0) {
      await this.props.updateToken(token);
      this.props.getUserInformation();
    }

    const nav = id => {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'FoiRequestsSingle',
          params: { foiRequestId: id },
        })
      );
    };

    if (!FDROID) setUp(nav);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    Linking.removeEventListener('url', this.handleUrlEvent);
  }

  handleUrlEvent = event => this.urlRouter(event.url);

  onBackPress = () => {
    const { dispatch, navigation } = this.props;
    // close the app when pressing back button on initial screen
    // because everything is wrapped in a Drawer, we need to go over this first
    // navigator
    if (
      navigation.routes[0].routes[0].index === 0 &&
      navigation.routes[0].routes[0].routes[0].index === 0
    ) {
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
          .alertWithType(
            'success',
            I18n.t('loginSuccess'),
            I18n.t('loginSuccessMessage')
          );

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
    const routeParts = route.split('/');
    const routeName = routeParts[0];

    // a for anfrage
    if (routeName === 'a') {
      // short url with the request id
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      dispatch(
        NavigationActions.navigate({
          routeName: 'FoiRequestsSingle',
          params: { foiRequestId: id },
        })
      );
    }

    if (routeName === 'anfrage' && routeParts.length !== 5) {
      // TODO: currently the same request is fetched twice
      const slug = route.split('/').reverse()[0];
      const res = await fetch(`${ORIGIN}/api/v1/request/?slug=${slug}`);
      const id = (await res.json()).objects[0].id;
      dispatch(
        NavigationActions.navigate({
          routeName: 'FoiRequestsSingle',
          params: { foiRequestId: id },
        })
      );
    }

    if (
      routeName === 'anfrage' &&
      routeParts.length === 5 &&
      !route.includes('#')
    ) {
      // an attachment
      const messageId = routeParts[2];
      const res = await fetch(
        `https://fragdenstaat.de/api/v1/message/${messageId}`
      );
      const message = await res.json();
      const id = message.request.split('/').reverse()[1];

      message.attachments.forEach(x => {
        console.log(x.name, routeParts[4].toLowerCase());
        if (x.name.toLowerCase() === routeParts[4].toLowerCase()) {
          const action1 = NavigationActions.navigate({
            routeName: 'FoiRequestsSingle',
            params: { foiRequestId: id },
          });
          // first to request, then to attachment
          dispatch(action1);
          const action2 = NavigationActions.navigate({
            routeName: 'FoiRequestsPdfViewer',
            params: { url: x.site_url, fileUrl: x.file_url },
          });
          dispatch(action2);
        }
      });
    }
  };

  render() {
    const {
      pastAlertMatches,
      alerts,
      hasNotificationPermission,
      searchUpdateAlertMatches,
    } = this.props;
    // background stuff
    if (hasNotificationPermission && alerts.length) {
      BackgroundFetch.configure(
        {
          minimumFetchInterval: 60, // <-- minutes (15 is minimum allowed)
          stopOnTerminate: false, // <-- Android-only,
          startOnBoot: true, // <-- Android-only,
          enableHeadless: true,
        },
        async () => {
          console.log('[js] Received background-fetch event');

          const data = await Promise.all(
            alerts.map(async x => {
              const response = await fetch(
                `https://fragdenstaat-alerts.app.vis.one/min/${x}`
              );
              console.log(response);
              const responseJson = await response.json();
              return { terms: x, res: responseJson };
            })
          );
          console.log(pastAlertMatches);
          data.forEach(x => {
            x.res.forEach(({ id }) => {
              // only works on request ids and not message ids.
              if (
                pastAlertMatches[x.terms] === undefined ||
                pastAlertMatches[x.terms].indexOf(id) < 0
              ) {
                localNotif(`Neuer Treffer für "${x.terms}"`, id);
              }
              searchUpdateAlertMatches(x.terms, id);
            });
          });

          console.log(data);

          BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
        },
        error => {
          console.log('[js] RNBackgroundFetch failed to start', error);
        }
      );

      // Optional: Query the authorization status.
      BackgroundFetch.status(status => {
        switch (status) {
          case BackgroundFetch.STATUS_RESTRICTED:
            console.log('BackgroundFetch restricted');
            break;
          case BackgroundFetch.STATUS_DENIED:
            console.log('BackgroundFetch denied');
            break;
          case BackgroundFetch.STATUS_AVAILABLE:
            console.log('BackgroundFetch is enabled');
            break;
          default:
            console.log('default');
        }
      });
    }

    const { navigation, dispatch } = this.props;

    return <App state={navigation} dispatch={dispatch} />;
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
  alerts: state.search.alerts,
  pastAlertMatches: state.search.pastAlertMatches,
  hasNotificationPermission: state.settings.hasNotificationPermission,
});

const mapDispatchToProps = dispatch => ({
  updateToken: token => dispatch(oauthUpdateToken(token)),
  redirectError: errorMessage =>
    dispatch(receiveOauthRedirectError(errorMessage)),
  getUserInformation: () => dispatch(getUserInformation()),
  searchUpdateAlertMatches: (term, id) =>
    dispatch(searchUpdateAlertMatchesAction(term, id)),
  dispatch,
});

const AppWithNavigationState = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxNavigation);

export { AppWithNavigationState, navMiddleware };
