import { StyleSheet } from 'react-native';

import { greyDark, greyLight } from '../../../globals/colors';

export default StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: greyLight,
  },
  nResults: {
    textAlign: 'center',
    color: greyDark,
    fontWeight: '400',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 5,
  },
  footer: {
    paddingVertical: 20,
  },
  listItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0,
  },
});
