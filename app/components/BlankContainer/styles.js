import { StyleSheet } from 'react-native';

import { contentContainerPadding } from '../../styles/content';

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    backgroundColor: 'white',
  },
  inner: {
    padding: contentContainerPadding,
  },
});

export { styles };
