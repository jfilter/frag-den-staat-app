import { Linking, Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { greyLight } from '../../../globals/colors';
import { styles } from './styles';

const Link = ({ label, url }) => (
  <TouchableHighlight
    style={{
      alignSelf: 'flex-start',
    }}
    underlayColor={greyLight}
    onPress={() => Linking.openURL(url)}
    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
  >
    <View>
      <Text selectable style={styles.label}>
        {label}
      </Text>
    </View>
  </TouchableHighlight>
);

Link.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Link;
