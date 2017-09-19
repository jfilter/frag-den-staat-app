import { StyleSheet } from 'react-native';

import {
  spaceMore,
  spaceNormal,
  contentContainerPadding,
} from '../../styles/content';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
    padding: spaceNormal,
  },
  heading: {
    marginTop: spaceMore - contentContainerPadding,
    marginBottom: spaceMore,
  },
  button: {
    marginBottom: spaceMore,
  },
});

export { styles };
