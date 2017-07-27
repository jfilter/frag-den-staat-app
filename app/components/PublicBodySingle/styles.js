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
    fontSize: 20,
    fontWeight: '600',
    marginTop: spaceMore - contentContainerPadding,
    marginBottom: spaceMore,
    textAlign: 'center',
  },
  button: {
    marginBottom: spaceMore,
  },
});

export { styles };
