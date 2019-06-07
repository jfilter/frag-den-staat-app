import { Alert, ScrollView, Picker } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationActions, DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import {
  foiRequestsFilterChange,
  foiRequestsCampaignChange,
} from '../../actions/foiRequests';
import { primaryColor, fontColor } from '../../globals/colors';

class FoiRequestDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerChosen: 0,
      pickerItems: [
        ['Keine Kampagnen', '-'],
        ['Mit Kampagnen', null],
        ['ausgewählte Kampagnen', 'tba'],
      ],
    };
  }

  pickerChange = async itemValue => {
    if (itemValue === 'tba') {
      const res = await fetch('https://fragdenstaat.de/api/v1/campaign/');
      const resJson = await res.json();
      const newItems = resJson.objects
        .map(({ id, name }) => [name, id])
        .sort((a, b) => b[1] - a[1]);
      this.setState({
        pickerItems: [...this.state.pickerItems.slice(0, 2), ...newItems],
      });
      this.setState({ pickerChosen: newItems[0][1] });
      this.props.updateCampaign(newItems[0][1]);
    } else {
      this.setState({ pickerChosen: itemValue });
      this.props.updateCampaign(itemValue);
    }
  };

  render() {
    const {
      filterChange,
      currentUserId,
      currentUserFilter,
      navigateToLogin,
      drawerClose,
      followingFilter,
    } = this.props;

    let chosenPublicFilter = false;
    let chosenMyRequestsFilter = false;
    let chosenFollowingFilter = false;
    let chosenArnesFilter = false;
    const arnesUserid = 4103;

    if (currentUserFilter == null && followingFilter == null) {
      chosenPublicFilter = true;
    }

    if (currentUserId && currentUserFilter === currentUserId) {
      chosenMyRequestsFilter = true;
    }

    if (currentUserId && followingFilter === currentUserId) {
      chosenFollowingFilter = true;
    }

    if (currentUserId && currentUserFilter === arnesUserid) {
      chosenArnesFilter = true;
    }

    return (
      <ScrollView style={{ paddingTop: 100 }}>
        <ListItem
          leftIcon={{
            name: 'public',
            color: chosenPublicFilter ? primaryColor : fontColor,
          }}
          hideChevron
          title="Alle Anfragen"
          titleStyle={{
            color: chosenPublicFilter ? primaryColor : fontColor,
          }}
          onPress={() => {
            filterChange({ user: null, follower: null });
            drawerClose();
          }}
        />
        <ListItem
          leftIcon={{
            name: 'person',
            color: chosenMyRequestsFilter ? primaryColor : fontColor,
          }}
          hideChevron
          title="Meine Anfragen"
          onPress={() => {
            if (currentUserId == null) {
              Alert.alert(
                'Du bist nicht eingeloggt.',
                'Bitte logge dich ein.',
                [
                  {
                    text: 'Jetzt einloggen',
                    onPress: () => navigateToLogin(),
                  },
                  {
                    text: 'Abbrechen',
                    style: 'cancel',
                  },
                ],
                { cancelable: false }
              );
            } else {
              filterChange({ user: currentUserId, follower: null });
              drawerClose();
            }
          }}
          titleStyle={{
            color: chosenMyRequestsFilter ? primaryColor : fontColor,
          }}
          containerStyle={{
            paddingVertical: 10,
          }}
        />
        <ListItem
          leftIcon={{
            name: 'star',
            color: chosenFollowingFilter ? primaryColor : fontColor,
          }}
          hideChevron
          title="Anfragen, denen ich folge"
          onPress={() => {
            if (currentUserId == null) {
              Alert.alert(
                'Du bist nicht eingeloggt.',
                'Bitte logge dich ein.',
                [
                  {
                    text: 'Jetzt einloggen',
                    onPress: () => navigateToLogin(),
                  },
                  {
                    text: 'Abbrechen',
                    style: 'cancel',
                  },
                ],
                { cancelable: false }
              );
            } else {
              filterChange({ follower: currentUserId, user: null });
              drawerClose();
            }
          }}
          titleStyle={{
            color: chosenFollowingFilter ? primaryColor : fontColor,
          }}
          containerStyle={{
            paddingVertical: 10,
          }}
        />
        <ListItem
          leftIcon={{
            name: 'wrench',
            type: 'font-awesome',
            color: chosenArnesFilter ? primaryColor : fontColor,
          }}
          hideChevron
          title="Arnes Anfragen"
          onPress={() => {
            filterChange({ user: arnesUserid, follower: null });
            drawerClose();
          }} // Arne's FdS user id (which is publicly accisbile)
          titleStyle={{
            color: chosenArnesFilter ? primaryColor : fontColor,
          }}
          containerStyle={{
            paddingVertical: 20,
          }}
        />
        <Picker
          selectedValue={this.state.pickerChosen}
          onValueChange={this.pickerChange}
        >
          {this.state.pickerItems.map((x, i) => (
            <Picker.Item label={x[0]} value={x[1]} />
          ))}
        </Picker>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.authentication.userId,
    currentUserFilter: state.foiRequests.filter.user,
    followingFilter: state.foiRequests.filter.follower,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filterChange: filter => dispatch(foiRequestsFilterChange(filter)),
    navigateToLogin: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileLogin' })),
    drawerClose: () => dispatch(DrawerActions.closeDrawer()),
    updateCampaign: x => dispatch(foiRequestsCampaignChange(x)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiRequestDrawer);
