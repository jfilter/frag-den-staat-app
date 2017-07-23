import React from 'react';
import { AppRegistry } from 'react-native';
import Instabug from 'instabug-reactnative';

import App from './app/App';
import { InstabugIosId } from './secrets.json';

console.disableYellowBox = true;

class iOSApp extends React.Component {
  componentWillMount() {
    Instabug.startWithToken(InstabugIosId, Instabug.invocationEvent.shake);
  }

  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('FragDenStaat', () => iOSApp);
