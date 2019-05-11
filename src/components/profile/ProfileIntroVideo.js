import { WebView } from 'react-native-webview';
import React from 'react';

const ProfileIntroVideo = () => (
  <WebView
    source={{ uri: 'https://player.vimeo.com/video/102604678?color=FFFFFF' }}
  />
);

export default ProfileIntroVideo;
