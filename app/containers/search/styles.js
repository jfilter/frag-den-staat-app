import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: { backgroundColor: 'white', height: '100%' },
  listBackground: { backgroundColor: 'white' },
  searchBarContainer: { marginTop: Platform.OS === 'ios' ? 20 : 0 },
});

export { styles };
