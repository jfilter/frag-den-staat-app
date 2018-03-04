import { Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const SubHeading = ({ style, children, ...rest }) => (
  <Text
    selectable
    style={[
      {
        fontSize: 20,
        textAlign: 'center',
      },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);

SubHeading.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
};

export default SubHeading;
