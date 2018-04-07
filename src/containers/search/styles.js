import { StyleSheet } from 'react-native';
import { greyLight } from '../../globals/colors';

const styles = StyleSheet.create({
  background: { backgroundColor: 'white', height: '100%' },
  listBackground: { backgroundColor: 'white' },
  searchBarContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchBarInput: { backgroundColor: greyLight, height: 50, paddingLeft: 45 },
});

export default styles;
