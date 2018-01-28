import 'react-native';
import React from 'react';
import Index from '../index.ios.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-fetch-blob', () => {
  return {
    DocumentDir: () => {},
    polyfill: () => {},
  };
});

jest.mock('ScrollView', () => jest.genMockFromModule('ScrollView'));

jest.mock('realm', () => {
  return require('../mocks/realm');
});

it('renders correctly', () => {
  const tree = renderer.create(<Index />);
});
