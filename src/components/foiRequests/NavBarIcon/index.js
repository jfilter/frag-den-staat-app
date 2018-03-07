import { Icon } from 'react-native-elements';
import { TouchableHighlight, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { primaryColor, greyLight } from '../../../globals/colors';

const NavBarIcon = ({ onPress, iconName, iconType, text }) => (
  <TouchableHighlight
    hitSlop={{ top: 20, bottom: 10, left: 20, right: 20 }}
    onPress={onPress}
    underlayColor={greyLight}
  >
    <View
      style={{
        marginVertical: 3,
        marginHorizontal: 5,
        paddingVertical: 2,
        paddingHorizontal: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: primaryColor,
        borderWidth: text == null ? 0 : 1,
        borderRadius: 2,
      }}
    >
      <Icon name={iconName} type={iconType} color={primaryColor} size={26} />
      <Text style={{ color: primaryColor, paddingLeft: 4 }}>{text}</Text>
    </View>
  </TouchableHighlight>
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
