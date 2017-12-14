import { Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const BodyText = ({ style, children, ...rest }) => (
  <Text
    selectable
    style={[
      {
        fontSize: 17,
      },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);

BodyText.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
};

export default BodyText;
