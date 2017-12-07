import { AppRegistry, AsyncStorage } from 'react-native';
import HockeyApp from 'react-native-hockeyapp';
import Instabug from 'instabug-reactnative';
import React, { Component } from 'react';

import { HockeyAppId } from './secrets.json';
import App from './app/App';

console.disableYellowBox = true;

export default class AndroidApp extends Component {
  async componentWillMount() {
    HockeyApp.configure(HockeyAppId, true);

    const inAppReporting = await AsyncStorage.getItem(
      '@inAppBugReportingEnabled'
    );
    if (inAppReporting === null || inAppReporting === 'true') {
      Instabug.setShakingThresholdForAndroid(250);
    } else {
      Instabug.setShakingThresholdForAndroid(10000);
    }
  }

  componentDidMount() {
    Instabug.setPromptOptionsEnabled(false, true, false);
    Instabug.setIntroMessageEnabled(false);

    if (!__DEV__) {
      HockeyApp.start();
      HockeyApp.checkForUpdate();
    }
  }
  render() {
    return <App />;
  }
}
// hotfix, see index.js
AppRegistry.registerComponent('FragDenStaat', () => AndroidApp);
