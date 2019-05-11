import { Platform, Share, WebView } from 'react-native';
import React from 'react';

import NavBarIcon from '../NavBarIcon';

const FoiRequestsWebView = ({ navigation }) => (
  <WebView source={{ uri: navigation.state.params.uri }} />
);

FoiRequestsWebView.navigationOptions = props => {
  const url = props.navigation.state.params.uri;

  function share() {
    Share.share(
      {
        ...Platform.select({
          ios: {
            url,
          },
          android: {
            message: url,
          },
        }),
        title: 'FragDenStaat',
      },
      {
        ...Platform.select({
          android: {
            // Android only:
            dialogTitle: `Share: ${url}`,
          },
        }),
      }
    );
  }

  let iconName = 'share';
  let iconType = 'material';

  // platform specific share button
  if (Platform.OS === 'ios') {
    iconName = 'ios-share';
    iconType = 'ionicon';
  }

  return {
    title: 'Browser-Ansicht',
    tabBarVisible: false,
    headerRight: (
      <NavBarIcon iconName={iconName} iconType={iconType} onPress={share} />
    ),
  };
};

export default FoiRequestsWebView;
