import { Animated, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import React from 'react';

import { grey, greyDark, primaryColor } from '../../../globals/colors';
import styles from './styles';

const FilterDropDownButton = ({
  filterFor,
  selection,
  onPress,
  containerStyles,
  dropdownAnim,
}) => {
  const spin =
    dropdownAnim &&
    dropdownAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

  const color =
    dropdownAnim &&
    dropdownAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [greyDark, primaryColor],
    });

  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  return (
    <Animated.View style={[styles.item, containerStyles]}>
      <TouchableHighlight onPress={onPress} underlayColor={grey}>
        <View>
          <View style={styles.align}>
            <Text style={styles.label}>{filterFor.toUpperCase()}</Text>
            <Animated.View
              style={
                spin && {
                  transform: [{ rotate: spin }],
                }
              }
            >
              <AnimatedIcon
                name="arrow-drop-down"
                style={{ color: color || greyDark }}
                size={25}
              />
            </Animated.View>
          </View>
          <Text style={styles.selection}>{selection.toUpperCase()}</Text>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
};

FilterDropDownButton.propTypes = {
  filterFor: PropTypes.string.isRequired,
  selection: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default FilterDropDownButton;
