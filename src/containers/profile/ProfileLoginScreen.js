import { WebView } from 'react-native-webview';
import React, { Component } from 'react';

import { requestAuthToken } from '../../utils/oauth';

class ProfilLoginScreen extends Component {
  render() {
    return <WebView source={{ uri: requestAuthToken }} />;
  }
}

export default ProfilLoginScreen;
