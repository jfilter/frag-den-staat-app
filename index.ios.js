import Instabug from 'instabug-reactnative';
import React from 'react';

import { InstabugIosId } from './secrets.json';
import App from './app/App';

console.disableYellowBox = true;

export default class iOSApp extends React.Component {
  async componentWillMount() {
    const inAppReporting = await AsyncStorage.getItem(
      '@inAppBugReportingEnabled'
    );

    if (inAppReporting === null || inAppReporting === 'true') {
      Instabug.startWithToken(InstabugIosId, Instabug.invocationEvent.shake);
      Instabug.setPromptOptionsEnabled(false, true, false);
      Instabug.setIntroMessageEnabled(false);
    }
  }

  render() {
    return <App />;
  }
}
