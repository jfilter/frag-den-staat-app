import { Button } from 'react-native-elements';
import React from 'react';

import { primaryColor } from '../../../globals/colors';

const borderRadius = 30;

const StandardButton = ({ containerViewStyle, ...rest }) => (
  <Button
    borderRadius={borderRadius}
    color={primaryColor}
    containerViewStyle={{
      margin: 5,
      borderRadius,
      borderWidth: 2,
      borderColor: primaryColor,
      ...containerViewStyle,
    }}
    backgroundColor={'white'}
    {...rest}
  />
);

export default StandardButton;
