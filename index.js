import { AppRegistry, Platform } from 'react-native';

import AndroidApp from './index.android';
import iOSApp from './index.ios';

if (Platform.OS === 'ios') {
  AppRegistry.registerComponent('FragDenStaat', () => iOSApp);
} else if (Platform.OS === 'android') {
  AppRegistry.registerComponent('FragDenStaat', () => AndroidApp);
}
