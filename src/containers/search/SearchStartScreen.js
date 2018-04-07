import { FlatList, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { SearchBar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { searchUpdateQuery } from '../../actions/search';
import { styles } from './styles';
import I18n from '../../i18n';

class SearchStartScreen extends React.Component {
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
        leftIcon={{ name: 'access-time' }}
        rightIcon={{ name: 'search' }}
        onPress={() => this._onSubmit(query)}
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
          placeholder={I18n.t('search')}
          onSubmitEditing={this._onSubmitSearchBar}
          autoFocus
          autoCorrect={false}
          containerStyle={styles.searchBarContainer}
        />
        <FlatList
          data={this.props.pastQueries.reverse()}
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
    updateQuery: query => dispatch(searchUpdateQuery(query)),
    navigateToResults: params =>
      dispatch(
        NavigationActions.navigate({ routeName: 'SearchResults', params })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchStartScreen);
