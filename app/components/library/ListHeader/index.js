import { Text } from 'react-native';
import React from 'react';

import I18n from '../../../i18n';
import styles from './styles';

const ListHeader = numResults => (
  <Text style={styles.numResults}>
    {numResults >= 0 && I18n.t('countingRequests', { count: numResults })}
  </Text>
);

export default ListHeader;
