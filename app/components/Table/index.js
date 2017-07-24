import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { styles } from './styles';

const Table = ({ data }) => {
  return (
    <View style={styles.table}>
      {data.map(({ label, value }) =>
        <View key={label} style={styles.row}>
          <View style={styles.item1}>
            <Text>
              {`${label}:`}
            </Text>
          </View>
          <View style={styles.item2}>
            {value}
          </View>
        </View>
      )}
    </View>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.element.isRequired,
    }).isRequired
  ).isRequired,
};

export default Table;
