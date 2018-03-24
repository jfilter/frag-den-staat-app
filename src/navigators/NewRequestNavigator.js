import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { NewRequestStartScreen } from '../containers/newRequest/NewRequestStartScreen';
import { commonNavigationOptions } from './styles';
import { greyDark } from '../globals/colors';
import navigateOnce from '../utils/navigateOnce';
import I18n from '../i18n';

const NewRequestNavigator = StackNavigator(
  {
    NewRequestStart: { screen: NewRequestStartScreen },
  },
  {
    navigationOptions: {
      ...commonNavigationOptions,
      drawerLockMode: 'locked-closed', // disable global drawer
      tabBarLabel: I18n.t('new'),
      tabBarIcon: () => <Icon size={24} color={greyDark} name="add" />,
    },
  }
);

NewRequestNavigator.router.getStateForAction = navigateOnce(
  NewRequestNavigator.router.getStateForAction
);

export default NewRequestNavigator;
