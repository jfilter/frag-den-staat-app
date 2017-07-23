import { StyleSheet } from 'react-native';

import { greyDark, greyLight, primaryColor } from '../../styles/colors';

export const LIST_HEADER_HEIGHT = 56;

export const styles = StyleSheet.create({
  background: { backgroundColor: 'white', height: '100%' },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: LIST_HEADER_HEIGHT,
  },
  filterItemContainer: {
    borderBottomWidth: 0,
  },
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: greyLight,
    // height: LIST_HEADER_HEIGHT,
  },
  item: {
    flexGrow: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: greyLight,
    paddingHorizontal: 10,
    paddingBottom: 5,
    // height: LIST_HEADER_HEIGHT,
  },
  firstItem: {
    borderLeftWidth: 0,
  },
  label: {
    fontSize: 12,
    color: greyDark,
  },
  selection: {
    color: primaryColor,
    fontSize: 12,
    // paddingTop: 1,
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
