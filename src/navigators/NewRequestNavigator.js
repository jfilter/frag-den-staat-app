import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { commonNavigationOptions } from './styles';
import { greyDark } from '../globals/colors';
import I18n from '../i18n';
import NewRequestConfirmScreen from '../containers/newRequest/NewRequestConfirmScreen';
import NewRequestStartScreen from '../containers/newRequest/NewRequestStartScreen';
import NewRequestWriteScreen from '../containers/newRequest/NewRequestWriteScreen';

const NewRequestNavigator = createStackNavigator(
  {
    NewRequestStart: { screen: NewRequestStartScreen },
    NewRequestWrite: { screen: NewRequestWriteScreen },
    NewRequestConfirm: { screen: NewRequestConfirmScreen },
  },
  {
    navigationOptions: {
      ...commonNavigationOptions,
      tabBarLabel: I18n.t('new'),
      tabBarIcon: () => <Icon size={24} color={greyDark} name="add" />,
    },
    defaultNavigationOptions: {
      ...commonNavigationOptions,
    },
  }
);

export default NewRequestNavigator;
