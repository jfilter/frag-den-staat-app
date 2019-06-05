/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('rn-fetch-blob', () => {
  return {
    DocumentDir: () => {},
    polyfill: () => {},
  };
});

jest.mock('react-native-background-fetch', () => {
  return {};
});

jest.mock('react-native-i18n', () => {
  return {};
});

jest.mock('react-native-elements', () => {
  return {};
});

jest.mock('react-native-paper', () => {
  return {};
});

jest.mock('react-native-paper', () => {
  return {};
});

// jest.mock('react-native-vector-icons', () => {
//   return {};
// });

jest.mock('react-native-dropdownalert', () => {
  return {};
});

// jest.mock('ScrollView', () => jest.genMockFromModule('ScrollView'));

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
}));

jest.mock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  };
});

jest.mock('react-native', () => ({
  AsyncStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    mergeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    flushGetRequests: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
    multiMerge: jest.fn(),
  },
}));

jest.mock('PushNotificationIOS', () => ({
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
}));

jest.mock('NativeModules', () => ({
  UIManager: {
    RCTView: () => {},
  },
  RNGestureHandlerModule: {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    State: {},
    Directions: {},
  },

  RNTrackerManager: {
    startTraceEvent: jest.fn(),
    postEvent: jest.fn(),
    endTraceEvent: jest.fn(),
  },

  RNComUtilManager: {
    setNavSwipe: jest.fn(),
  },

  //mock三方库的native module
  RNVectorIconsManager: {},

  //mock react-native的native module（react-native-mock-render缺失）
  StatusBarManager: {
    HEIGHT: 800,
    setStyle: jest.fn(),
    setHidden: jest.fn(),
    setNetworkActivityIndicatorVisible: jest.fn(),
  },
  KeyboardObserver: {},
}));

it('renders correctly', () => {
  const tree = renderer.create(<App />);
});
