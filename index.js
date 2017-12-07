import { AppRegistry, Platform } from 'react-native';

import AndroidApp from './index.android';
import iOSApp from './index.ios';

// FIXME: only works for debug – not for release
// There has been some changes over the versions of RN for the index.js and
// it looks like something is broken right now. This files does not get called
// when building for release.
if (Platform.OS === 'ios') {
  AppRegistry.registerComponent('FragDenStaat', () => iOSApp);
} else if (Platform.OS === 'android') {
  AppRegistry.registerComponent('FragDenStaat', () => AndroidApp);
}
