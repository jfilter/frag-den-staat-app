import { StyleSheet } from 'react-native';

import { greyLight } from '../../globals/colors';

const styles = StyleSheet.create({
  listItemContainer: {
    borderBottomColor: greyLight,
    borderTopWidth: 0,
    borderBottomWidth: 1,
  },
  firstItemContainer: {
    borderTopWidth: 1,
    borderTopColor: greyLight,
  },
});

export { styles };
