import { Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { secondaryColor } from '../../../styles/colors';

const FloatingHeading = ({ style, children, ...rest }) => (
  <Text
    style={[
      {
        fontSize: 15,
        fontWeight: '600',
        // textAlign: 'center',
        // color: secondaryColor,
      },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);

FloatingHeading.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
};

export default FloatingHeading;
