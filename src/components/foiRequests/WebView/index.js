import { WebView } from 'react-native';
import React from 'react';

const FoiRequestsWebView = ({ navigation }) => (
  <WebView source={{ uri: navigation.state.params.uri }} />
);

FoiRequestsWebView.navigationOptions = {
  title: 'Browser-Ansicht',
  tabBarVisible: false,
  drawerLockMode: 'locked-closed', // disable global drawer
};

export default FoiRequestsWebView;
