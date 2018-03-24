import { Alert, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import { foiRequestsFilterChange } from '../../actions/foiRequests';
import { greyLight, primaryColor, fontColor } from '../../globals/colors';

const FoiRequestDrawer = ({
  filterChange,
  currentUserId,
  currentUserFilter,
  navigateToLogin,
  drawerClose,
}) => (
  <ScrollView style={{ paddingTop: 100 }}>
    <ListItem
      leftIcon={{
        name: 'public',
        color: currentUserFilter == null ? primaryColor : fontColor,
      }}
      hideChevron
      title="Alle Anfragen"
      titleStyle={{
        color: currentUserFilter == null ? primaryColor : fontColor,
      }}
      containerStyle={{
        borderTopWidth: 1,
        borderTopColor: greyLight,
        borderBottomColor: greyLight,
      }}
      onPress={() => filterChange({ user: null })}
    />
    <ListItem
      leftIcon={{
        name: 'person',
        color:
          currentUserId && currentUserFilter === currentUserId
            ? primaryColor
            : fontColor,
      }}
      hideChevron
      title="Meine Anfragen"
      onPress={() =>
        currentUserId == null
          ? Alert.alert(
              'Du bist nicht eingeloggt.',
              'Bitte logge dich ein.',
              [
                {
                  text: 'Jetzt einloggen',
                  onPress: () => {
                    drawerClose();
                    setTimeout(() => navigateToLogin(), 300);
                  },
                },
                {
                  text: 'Abbrechen',
                  style: 'cancel',
                },
              ],
              { cancelable: false }
            )
          : filterChange({ user: currentUserId })
      }
      titleStyle={{
        color:
          currentUserId && currentUserFilter === currentUserId
            ? primaryColor
            : fontColor,
      }}
      containerStyle={{
        borderBottomColor: greyLight,
        paddingVertical: 10,
      }}
    />
    <ListItem
      leftIcon={{
        name: 'wrench',
        type: 'font-awesome',
        color: currentUserFilter === 4103 ? primaryColor : fontColor,
      }}
      hideChevron
      title="Arnes Anfragen"
      onPress={() => filterChange({ user: 4103 })} // Arne's FdS user id (which is publicly accisbile)
      titleStyle={{
        color: currentUserFilter === 4103 ? primaryColor : fontColor,
      }}
      containerStyle={{
        borderBottomColor: greyLight,
        paddingVertical: 20,
      }}
    />
  </ScrollView>
);

const mapStateToProps = state => {
  return {
    currentUserId: state.authentication.userId,
    currentUserFilter: state.foiRequests.filter.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filterChange: filter => dispatch(foiRequestsFilterChange(filter)),
    navigateToLogin: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileLogin' })),
    drawerClose: () =>
      dispatch(NavigationActions.navigate({ routeName: 'DrawerClose' })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoiRequestDrawer);
