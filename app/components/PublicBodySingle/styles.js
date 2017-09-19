import { StyleSheet } from 'react-native';

import { contentContainerPadding, spaceMore } from '../../styles/content';

const styles = StyleSheet.create({
  heading: {
    marginTop: spaceMore,
    marginBottom: spaceMore + contentContainerPadding,
  },
  button: {
    marginBottom: spaceMore,
  },
});

export { styles };
