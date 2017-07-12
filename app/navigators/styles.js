import {
  primaryColor,
  secondaryColor,
  greyDark,
  greyLight,
} from '../styles/colors';

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

export { commonNavigationOptions, iconColor, iconSize };
