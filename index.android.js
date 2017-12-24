import { AppRegistry } from 'react-native';
import React, { Component } from 'react';

import App from './app/App';

console.disableYellowBox = true;

export default class AndroidApp extends Component {
  render() {
    return <App />;
  }
}
// hotfix, see index.js
AppRegistry.registerComponent('FragDenStaat', () => AndroidApp);
