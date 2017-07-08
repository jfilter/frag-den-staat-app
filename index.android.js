import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import HockeyApp from 'react-native-hockeyapp';

import App from './app/App';
import { HockeyAppId } from './secrets.json';

class AndroidApp extends Component {
  componentWillMount() {
    HockeyApp.configure(HockeyAppId, true);
  }

  componentDidMount() {
    HockeyApp.start();
    HockeyApp.checkForUpdate();
  }
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('FragDenStaat', () => AndroidApp);
