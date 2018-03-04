import { FlatList, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { SearchBar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import React from 'react';

import { insertPastQuery, getPastQueries } from '../../data/db/dbHelper';
import {
  searchUpdateQuery,
  searchUpdatePastQueries,
} from '../../actions/search';
import { styles } from './styles';
import I18n from '../../i18n';

class SearchStartScreen extends React.Component {
  componentDidMount() {
    const pastQueries = getPastQueries();
    this.props.updatePastQueries(pastQueries);
  }

  _onSubmit = queryText => {
    this.props.navigateToResults({ query: queryText });
    this.props.updateQuery(queryText);
  };

  _onSubmitSearchBar = event => {
    const queryText = event.nativeEvent.text.trim();
    this._onSubmit(queryText);

    // first dispatch the navigation action, then add the query to the DB

    insertPastQuery(queryText);
    const pastQueries = getPastQueries();
    this.props.updatePastQueries(pastQueries);
  };

  _renderItem = ({ item }) => {
    return (
      <ListItem
        key={item.createdAt}
        title={item.query}
        leftIcon={{ name: 'access-time' }}
        rightIcon={{ name: 'search' }}
        onPress={() => this._onSubmit(item.query)}
      />
    );
  };

  render() {
    return (
      <View style={styles.background} keyboardShouldPersistTaps="handled">
        <SearchBar
          lightTheme
          clearIcon={{ color: '#86939e', name: 'clear' }}
          textInputRef="searchInput"
          // onChangeText={() => console.log('x')}
          placeholder={I18n.t('search')}
          onSubmitEditing={this._onSubmitSearchBar}
          autoFocus
          autoCorrect={false}
          containerStyle={styles.searchBarContainer}
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

SearchStartScreen.navigationOptions = {
  title: I18n.t('search'),
  header: null,
};

SearchStartScreen.propTypes = {};

const mapStateToProps = state => {
  return {
    pastQueries: state.search.pastQueries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePastQueries: pastQueries =>
      dispatch(searchUpdatePastQueries(pastQueries)),
    updateQuery: query => dispatch(searchUpdateQuery(query)),
    navigateToResults: params =>
      dispatch(
        NavigationActions.navigate({ routeName: 'SearchResults', params })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchStartScreen);
