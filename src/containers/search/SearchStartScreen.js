import { FlatList, View, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { SearchBar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import NavBarIcon from '../../components/foiRequests/NavBarIcon';

import { searchUpdateQueryAction } from '../../actions/search';
import styles from './styles';
import I18n from '../../i18n';
import {
  greyDark,
  fontColor,
  primaryColor,
  greyLight,
} from '../../globals/colors';
import { FDROID } from '../../globals';

class SearchStartScreen extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  _onSubmit = queryText => {
    this.props.navigateToResults({ query: queryText });
    this.props.updateQuery(queryText);
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
        leftIcon={{ name: 'access-time', color: greyDark }}
        rightIcon={{ name: 'search', color: primaryColor }}
        onPress={() => this._onSubmit(query)}
        titleStyle={{ color: fontColor }}
      />
    );
  };

  render() {
    const size = Platform.OS === 'ios' ? 35 : 26; // for icon
    const { search } = this.state;
    return (
      <View style={styles.background} keyboardShouldPersistTaps="handled">
        <SearchBar
          lightTheme
          icon={{
            type: 'material',
            color: greyDark,
            name: 'search',
            size,
          }}
          clearIcon={{
            color: greyDark,
            name: 'clear',
            size,
          }}
          textInputRef="searchInput"
          placeholder="Berlin, Schule, NSA..."
          onSubmitEditing={this._onSubmitSearchBar}
          autoFocus
          autoCorrect={false}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={{ backgroundColor: greyLight }}
          round
          onChangeText={this.updateSearch}
          value={search}
        />
        <FlatList
          data={this.props.pastQueries}
          renderItem={this._renderItem}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    );
  }
}

SearchStartScreen.navigationOptions = ({ navigation }) => {
  const navigateToAlerts = () =>
    navigation.dispatch(
      NavigationActions.navigate({ routeName: 'SearchAlerts' })
    );
  if (!FDROID) {
    return {
      title: I18n.t('search'),
      headerRight: (
        <NavBarIcon onPress={navigateToAlerts} iconName="notifications" />
      ),
    };
  }
  return {
    title: I18n.t('search'),
  };
};

SearchStartScreen.propTypes = {
  pastQueries: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateQuery: PropTypes.func.isRequired,
  navigateToResults: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    pastQueries: state.search.pastQueries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateQuery: query => dispatch(searchUpdateQueryAction(query)),
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
