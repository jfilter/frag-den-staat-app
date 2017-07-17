import React from 'react';
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Animated,
  RefreshControl,
  Alert,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { SearchBar, ListItem } from 'react-native-elements';
import moment from 'moment';

import {
  searchUpdateQuery,
  searchUpdatePastQueries,
} from '../../actions/search';
import { insertPastQuery, getPastQueries } from '../../data/db/dbHelper';

class SearchStartScreen extends React.Component {
  componentDidMount() {
    const pastQueries = getPastQueries();
    this.props.updatePastQueries(pastQueries);
  }

  _onSubmit = queryText => {
    this.props.updateQuery(queryText);
    this.props.navigateToResults({ query: queryText });
  };

  _onSubmitSearchBar = event => {
    const queryText = event.nativeEvent.text;

    insertPastQuery(queryText);
    const pastQueries = getPastQueries();
    this.props.updatePastQueries(pastQueries);

    this._onSubmit(queryText);
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
      <View>
        <SearchBar
          lightTheme
          clearIcon={{ color: '#86939e', name: 'clear' }}
          textInputRef="searchInput"
          onChangeText={() => console.log('x')}
          placeholder="Search"
          onSubmitEditing={this._onSubmitSearchBar}
          autoFocus
        />
        <FlatList data={this.props.pastQueries} renderItem={this._renderItem} />
      </View>
    );
  }
}

SearchStartScreen.navigationOptions = {
  title: 'Search',
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
