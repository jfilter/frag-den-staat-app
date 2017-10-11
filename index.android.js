import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import HockeyApp from 'react-native-hockeyapp';
import Instabug from 'instabug-reactnative';

import App from './app/App';
import { HockeyAppId } from './secrets.json';

console.disableYellowBox = true;

class AndroidApp extends Component {
  componentWillMount() {
    Instabug.setPromptOptionsEnabled(false, true, false);
    Instabug.setIntroMessageEnabled(false);
    HockeyApp.configure(HockeyAppId, true);
  }

  componentDidMount() {
    if (!__DEV__) {
      HockeyApp.start();
      HockeyApp.checkForUpdate();
    }
  }
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('FragDenStaat', () => AndroidApp);
