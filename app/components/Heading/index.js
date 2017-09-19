import { Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const Heading = ({ style, children, ...rest }) => (
  <Text
    style={[
      {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
      },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);

Heading.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
};

export default Heading;
