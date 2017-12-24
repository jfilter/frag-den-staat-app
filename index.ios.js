import { AppRegistry } from 'react-native';
import React from 'react';

import App from './app/App';

console.disableYellowBox = true;

export default class iOSApp extends React.Component {
  render() {
    return <App />;
  }
}
// hotfix, see index.js
AppRegistry.registerComponent('FragDenStaat', () => iOSApp);
