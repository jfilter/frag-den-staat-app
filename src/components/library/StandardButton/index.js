import { Button, Icon } from 'react-native-elements';
import React from 'react';

import { primaryColor } from '../../../globals/colors';

const borderRadius = 30;

const StandardButton = ({ containerViewStyle, icon, ...rest }) => (
  <Button
    buttonStyle={{
      margin: 5,
      padding: 5,
      borderRadius,
      borderWidth: 2,
      borderColor: primaryColor,
      ...containerViewStyle,
      backgroundColor: 'white',
    }}
    titleStyle={{
      color: primaryColor,
    }}
    icon={
      icon != null && (
        <Icon
          name={icon.name}
          color={icon.color}
          size={icon.size}
          type={icon.type}
        />
      )
    }
    {...rest}
  />
);

export default StandardButton;
