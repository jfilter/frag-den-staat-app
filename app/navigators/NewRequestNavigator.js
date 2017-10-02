import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { NewRequestStartScreen } from '../containers/newRequest/NewRequestStartScreen';
import { commonNavigationOptions } from './styles';
import { greyDark } from '../globals/colors';
import navigateOnce from '../utils/navigateOnce';

const NewRequestNavigator = StackNavigator(
  {
    NewRequestStart: { screen: NewRequestStartScreen },
  },
  {
    navigationOptions: {
      ...commonNavigationOptions,
      tabBarLabel: 'New',
      tabBarIcon: () => <Icon size={24} color={greyDark} name="add" />,
    },
  }
);

NewRequestNavigator.router.getStateForAction = navigateOnce(
  NewRequestNavigator.router.getStateForAction
);

export default NewRequestNavigator;
