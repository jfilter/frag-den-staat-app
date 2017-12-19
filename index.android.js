import { AppRegistry, AsyncStorage } from 'react-native';
import Instabug from 'instabug-reactnative';
import React, { Component } from 'react';

import App from './app/App';

console.disableYellowBox = true;

export default class AndroidApp extends Component {
  async componentWillMount() {
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
  }
  render() {
    return <App />;
  }
}
// hotfix, see index.js
AppRegistry.registerComponent('FragDenStaat', () => AndroidApp);
