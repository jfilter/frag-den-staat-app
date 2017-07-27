import { Linking, Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { grey } from '../../styles/colors';
import { styles } from './styles';

const Link = ({ label, url }) =>
  <TouchableHighlight
    style={{
      alignSelf: 'center',
    }}
    underlayColor={grey}
    onPress={() => Linking.openURL(url)}
  >
    <View>
      <Text style={styles.label}>
        {label}
      </Text>
    </View>
  </TouchableHighlight>;

Link.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Link;
