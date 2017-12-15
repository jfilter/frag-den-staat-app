import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import React from 'react';

import { primaryColor } from '../../../globals/colors';

const NavBarIcon = ({ onPress, iconName, iconType }) => (
  <Icon
    hitSlop={{ top: 20, bottom: 10, left: 20, right: 20 }}
    name={iconName}
    type={iconType}
    color={primaryColor}
    size={26}
    onPress={onPress}
    containerStyle={{
      paddingVertical: 7,
      paddingHorizontal: 10,
    }}
  />
);

NavBarIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.string,
};

NavBarIcon.defaultProps = {
  iconType: 'material',
};

export default NavBarIcon;
