import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { commonNavigationOptions } from './styles';
import { greyDark } from '../globals/colors';
import I18n from '../i18n';
import NewRequestConfirmScreen from '../containers/newRequest/NewRequestConfirmScreen';
import NewRequestStartScreen from '../containers/newRequest/NewRequestStartScreen';
import NewRequestWriteScreen from '../containers/newRequest/NewRequestWriteScreen';

import navigateOnce from '../utils/navigateOnce';

const NewRequestNavigator = StackNavigator(
  {
    NewRequestStart: { screen: NewRequestStartScreen },
    NewRequestWrite: { screen: NewRequestWriteScreen },
    NewRequestConfirm: { screen: NewRequestConfirmScreen },
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
