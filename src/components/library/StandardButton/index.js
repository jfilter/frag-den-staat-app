import { Button, Icon } from 'react-native-elements';
import React from 'react';

import { greyDark, primaryColor } from '../../../globals/colors';

const borderRadius = 30;

const StandardButton = ({ containerViewStyle, disabled, icon, ...rest }) => (
  <Button
    buttonStyle={{
      margin: 5,
      padding: 5,
      borderRadius,
      borderWidth: 2,
      borderColor: primaryColor,
      backgroundColor: 'white',
      ...containerViewStyle,
    }}
    titleStyle={{
      color: primaryColor,
    }}
    icon={
      icon != null && (
        <Icon
          name={icon.name}
          color={disabled ? greyDark : icon.color}
          size={icon.size}
          type={icon.type}
        />
      )
    }
    disabled={disabled === true}
    disabledTitleStyle={{ color: greyDark }}
    disabledStyle={{ borderColor: greyDark }}
    {...rest}
  />
);

export default StandardButton;
