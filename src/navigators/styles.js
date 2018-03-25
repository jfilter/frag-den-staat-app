import { Platform } from 'react-native';

import {
  greyDark,
  greyLight,
  primaryColor,
  secondaryColor,
} from '../globals/colors';

const commonNavigationOptions = {
  headerTintColor: primaryColor,
  headerTitleStyle: { color: secondaryColor }, // change the color back to black from the overriden primary color
  headerStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: greyLight,
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
  },
};

const iconColor = greyDark;
const iconSize = 24;

const commongTabBarOptions = {
  showIcon: true,
  activeTintColor: primaryColor,
  inactiveTintColor: greyDark,
  indicatorStyle: { backgroundColor: primaryColor },
  labelStyle:
    Platform.OS === 'android'
      ? {
          fontSize: 9,
          margin: 0,
          marginVertical: 5,
        }
      : { paddingBottom: 5 },
  style: {
    elevation: 0,
    shadowOpacity: 0,
    borderTopWidth: 0,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: greyLight,
    height: Platform.OS === 'ios' ? 60 : 'auto',
  },
};

const tabBarConfig = {
  backBehavior: 'none',
  tabBarPosition: 'top',
  tabBarOptions: { ...commongTabBarOptions },
};

export { commonNavigationOptions, tabBarConfig, iconColor, iconSize };
