import { Icon } from 'react-native-elements';
import { TouchableHighlight, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { grey, greyDark } from '../../../globals/colors';
import styles from './styles';

const FilterDropDownButton = ({
  filterFor,
  selection,
  onPress,
  containerStyles,
}) => (
  <View style={[styles.item, containerStyles]}>
    <TouchableHighlight onPress={onPress} underlayColor={grey}>
      <View>
        <View style={styles.align}>
          <Text style={styles.label}>{filterFor.toUpperCase()}</Text>
          <Icon
            name="arrow-drop-down"
            color={greyDark}
            height={20}
            width={20}
          />
        </View>
        <Text style={styles.selection}>{selection.toUpperCase()}</Text>
      </View>
    </TouchableHighlight>
  </View>
);

FilterDropDownButton.propTypes = {
  filterFor: PropTypes.string.isRequired,
  selection: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default FilterDropDownButton;
