import { StyleSheet } from 'react-native';

import { primaryColor, greyLight } from '../../styles/colors';
import { spaceNormal, spaceMore } from '../../styles/content';

const textPaddingTable = 3;

const styles = StyleSheet.create({
  table: {
    marginTop: spaceMore,
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
  hotfixTextPaddingTable: {
    paddingRight: spaceNormal * 2 + 1, // the padding space and the border
  },
  linkTouchable: {
    alignSelf: 'flex-start',
    paddingVertical: textPaddingTable,
    paddingRight: textPaddingTable * 3,
  },
  link: {
    color: primaryColor,
  },
  law: {
    paddingVertical: textPaddingTable,
  },
});

export { styles };
