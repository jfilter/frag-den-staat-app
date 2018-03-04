import { ListItem } from 'react-native-elements';
import RadioButton from 'react-native-radio-button';
import React from 'react';
import PropTypes from 'prop-types';

import { grey, primaryColor } from '../../../globals/colors';
import styles from './styles';

const ListItemRadioButton = ({ title, onSwitch, switched }) => (
  <ListItem
    title={title}
    rightIcon={
      <RadioButton
        animation={switched && 'bounceIn'}
        isSelected={switched}
        onPress={onSwitch}
        innerColor={switched ? primaryColor : grey}
        outerColor={switched ? primaryColor : grey}
      />
    }
    containerStyle={styles.container}
    onPress={onSwitch}
  />
);

ListItemRadioButton.propTypes = {
  title: PropTypes.string.isRequired,
  onSwitch: PropTypes.func.isRequired,
  switched: PropTypes.bool.isRequired,
};

export default ListItemRadioButton;
