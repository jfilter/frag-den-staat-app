import { StyleSheet } from 'react-native';

import { greyLight } from '../../../globals/colors';
import { spaceNormal } from '../../../globals/content';

const textPaddingTable = 3;

const styles = StyleSheet.create({
  table: {
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: greyLight,
    paddingHorizontal: spaceNormal,
    paddingVertical: spaceNormal - textPaddingTable,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 1,
  },
  item1: {
    width: '33%',
    paddingVertical: textPaddingTable,
    paddingRight: textPaddingTable,
  },
  item2: { width: '67%', paddingVertical: textPaddingTable },
  // hot fix because the text wasn't wrapping
  hotfixTextPaddingTable: {
    paddingRight: spaceNormal * 2 + 1, // the padding space and the border
  },
});

export { styles };
