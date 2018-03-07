import { Icon, ListItem } from 'react-native-elements';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { ScrollView } from 'react-native';
import { TabNavigator, DrawerNavigator } from 'react-navigation';
import React from 'react';

import { greyLight, primaryColor } from '../globals/colors';
import NewRequestNavigator from './NewRequestNavigator';
import ProfileNavigator from './ProfileNavigator';
import SearchNavigator from './SearchNavigator';
import foiRequestsNavigator from './FoiRequestsNavigator';
import { foiRequestsFilterChange } from '../actions/foiRequests';

const AppNavigator = TabNavigator(
  {
    Requests: { screen: foiRequestsNavigator },
    Search: { screen: SearchNavigator },
    NewRequest: { screen: NewRequestNavigator },
    Profile: { screen: ProfileNavigator },
  },
  {
    tabBarComponent: NavigationComponent,
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    lazy: true,
    tabBarOptions: {
      bottomNavigationOptions: {
        labelColor: primaryColor,
        rippleColor: 'white',
        backgroundColor: 'white',
        style: {
          borderTopWidth: 1,
          borderTopColor: greyLight,
        },
        tabs: {
          Requests: {
            activeIcon: <Icon size={24} color={primaryColor} name="home" />,
          },
          Search: {
            activeIcon: <Icon size={24} color={primaryColor} name="search" />,
          },
          NewRequest: {
            activeIcon: <Icon size={24} color={primaryColor} name="add" />,
          },
          Profile: {
            activeIcon: (
              <Icon size={24} color={primaryColor} name="more-horiz" />
            ),
          },
        },
      },
    },
  }
);

const Drawer = DrawerNavigator(
  {
    AppNavigator: { screen: AppNavigator },
  },
  {
    contentComponent: props => {
      return (
        <ScrollView style={{ paddingTop: 100 }}>
          <ListItem
            leftIcon={{ name: 'public' }}
            hideChevron
            title="Alle Anfragen"
            containerStyle={{
              borderTopWidth: 1,
              borderTopColor: greyLight,
              borderBottomColor: greyLight,
            }}
            onPress={() =>
              props.navigation.dispatch(foiRequestsFilterChange({ user: null }))
            }
          />
          <ListItem
            leftIcon={{ name: 'person' }}
            hideChevron
            title="Meine Anfragen"
            onPress={() =>
              props.navigation.dispatch(foiRequestsFilterChange({ user: true }))
            }
            containerStyle={{
              borderBottomColor: greyLight,
              paddingVertical: 10,
              backgroundColor:
                props.navigation.state.params &&
                props.navigation.state.params.filter.user !== null
                  ? 'blue'
                  : 'white',
            }}
          />
          <ListItem
            leftIcon={{ name: 'star' }}
            hideChevron
            title="Anfragen, denen ich folge"
            onPress={() =>
              props.navigation.dispatch(foiRequestsFilterChange({ user: true }))
            }
            containerStyle={{
              borderBottomColor: greyLight,
              paddingVertical: 20,
            }}
          />
        </ScrollView>
      );
    },
  }
);

export default Drawer;
