import { FlatList, View, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { SearchBar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  searchRemoveAlertAction,
  searchAddAlertAction,
} from '../../actions/search';
import styles from './styles';
import I18n from '../../i18n';
import { greyDark, fontColor, primaryColor } from '../../globals/colors';

class SearchStartScreen extends React.Component {
  _onSubmit = queryText => {
    this.props.addAlert(queryText);
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
        <SearchBar
          lightTheme
          textInputRef="searchInput"
          placeholder="Berlin, Schule, NSA..."
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
