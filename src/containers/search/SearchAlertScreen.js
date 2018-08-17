import { FlatList, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { SearchBar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { PushNotification } from '../../utils/notifications';
import { updateNotificationPermissionAction } from '../../actions/settings';
import BodyText from '../../components/library/BodyText';

import {
  searchRemoveAlertAction,
  searchAddAlertAction,
} from '../../actions/search';
import styles from './styles';
import I18n from '../../i18n';
import { greyDark, fontColor, primaryColor } from '../../globals/colors';

class SearchStartScreen extends React.Component {
  _onSubmit = queryText => {
    if (!this.props.hasNotificationPermission) {
      PushNotification.checkPermissions(async x => {
        if (x.alert === 1) {
          this.props.addAlert(queryText);
          // save in state that we have the permission so we don't have to
          // check again
          this.props.updateNotificationPermission(true);
        } else {
          PushNotification.requestPermissions();
          setTimeout(() => {
            PushNotification.checkPermissions(xx => {
              if (xx.alert === 1) {
                this.props.updateNotificationPermission(true);
              }
            });
          }, 30000); // some hack, wait 30 sec and then check
          this.props.addAlert(queryText);
        }
      });
    } else {
      this.props.addAlert(queryText);
    }
  };

  _onSubmitSearchBar = event => {
    const queryText = event.nativeEvent.text.trim();
    this._onSubmit(queryText);
  };

  _renderItem = ({ item: query }) => {
    return (
      <ListItem
        key={query}
        title={query}
        rightIcon={{ name: 'delete', color: primaryColor }}
        onPress={() => this.props.removeAlert(query)}
        titleStyle={{ color: fontColor }}
      />
    );
  };

  render() {
    return (
      <View style={styles.background} keyboardShouldPersistTaps="handled">
        <BodyText style={{ margin: 10 }}>
          Hier kannst du Anfragen und Nachrichten auf FragDenStaat nach
          Stichwörtern durchsuchen lassen. Bei neuen Treffern erhälst du eine
          Push-Benachrichtigung. Damit das funktioniert, brauchen wir deine
          Erlaubnis.
        </BodyText>
        <SearchBar
          lightTheme
          textInputRef="searchInput"
          placeholder="Polizei, Schule, Fahrrad..."
          onSubmitEditing={this._onSubmitSearchBar}
          autoFocus
          autoCorrect={false}
          containerStyle={styles.searchBarContainer}
        />
        <FlatList
          data={this.props.alerts}
          renderItem={this._renderItem}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    );
  }
}

SearchStartScreen.navigationOptions = {
  title: I18n.t('alerts'),
};

const mapStateToProps = state => {
  return {
    alerts: state.search.alerts,
    hasNotificationPermission: state.settings.hasNotificationPermission,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateNotificationPermission: value =>
      dispatch(updateNotificationPermissionAction(value)),
    addAlert: query => dispatch(searchAddAlertAction(query)),
    removeAlert: query => dispatch(searchRemoveAlertAction(query)),
    navigateToResults: params =>
      dispatch(
        NavigationActions.navigate({ routeName: 'SearchResults', params })
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchStartScreen);
