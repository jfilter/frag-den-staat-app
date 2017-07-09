import { StyleSheet } from 'react-native';

import { greyDark, greyLight } from '../../styles/colors';

export const LIST_HEADER_HEIGHT = 64;

export const styles = StyleSheet.create({
  background: { backgroundColor: 'white', height: '100%' },
  seperator: {
    height: 1,
    backgroundColor: greyLight,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: LIST_HEADER_HEIGHT,
  },
  nResults: {
    textAlign: 'center',
    color: greyDark,
    fontWeight: '400',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 5,
  },
});
