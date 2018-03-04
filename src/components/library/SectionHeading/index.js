import { Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { secondaryColor } from '../../../globals/colors';

const SectionHeading = ({ style, children, ...rest }) => (
  <Text
    style={[
      {
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 40,
        fontWeight: '600',
        color: secondaryColor,
      },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);

SectionHeading.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
};

export default SectionHeading;
