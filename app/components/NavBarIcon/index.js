import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import { primaryColor } from '../../styles/colors';

const NavBarIcon = ({ onPress, iconName, iconType }) =>
  <Icon
    name={iconName}
    type={iconType}
    color={primaryColor}
    size={26}
    onPress={onPress}
    containerStyle={{
      paddingVertical: 7,
      paddingHorizontal: 10,
    }}
  />;

NavBarIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.string,
};

NavBarIcon.defaultProps = {
  iconType: 'material',
};

export default NavBarIcon;
