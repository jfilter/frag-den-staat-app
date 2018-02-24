import { StyleSheet } from 'react-native';

import { greyDark, greyLight, primaryColor } from '../../../globals/colors';

const styles = StyleSheet.create({
  item: {
    flexGrow: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: greyLight,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  label: {
    fontSize: 12,
    color: greyDark,
  },
  selection: {
    color: primaryColor,
    fontSize: 12,
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export default styles;
