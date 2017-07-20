import { StyleSheet } from 'react-native';

export const LIST_HEADER_HEIGHT = 64;

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
});
