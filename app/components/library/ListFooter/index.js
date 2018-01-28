import { ActivityIndicator, View } from 'react-native';
import React from 'react';

import { primaryColorLight } from '../../../globals/colors';
import styles from './styles';

const ListFooter = ({ isPending }) => {
  if (!isPending) return null;

  return (
    <View style={styles.footer}>
      <ActivityIndicator animating size="large" color={primaryColorLight} />
    </View>
  );
};

export default ListFooter;
