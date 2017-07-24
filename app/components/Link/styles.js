import { StyleSheet } from 'react-native';

import { primaryColor } from '../../styles/colors';

const linkPadding = 3;

const styles = StyleSheet.create({
  label: {
    color: primaryColor,
    paddingVertical: linkPadding,
    paddingRight: linkPadding,
  },
});

export { styles, linkPadding };
