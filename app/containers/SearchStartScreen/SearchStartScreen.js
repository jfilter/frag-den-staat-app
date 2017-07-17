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
import { SearchBar } from 'react-native-elements';
import moment from 'moment';

import { searchUpdateQuery } from '../../actions/search';

class SearchStartScreen extends React.Component {
  _onSubmit = event => {
    const queryText = event.nativeEvent.text;
    this.props.updateQuery(queryText);
    this.props.navigateToResults({ query: queryText });
  };

  render() {
    return (
      <View>
        <SearchBar
          ref={x => (this.query = x)}
          onChangeText={() => console.log('x')}
          placeholder="Type Here..."
          onSubmitEditing={this._onSubmit}
        />
      </View>
    );
  }
}

SearchStartScreen.navigationOptions = {
  title: 'Search',
};

SearchStartScreen.propTypes = {};

const mapStateToProps = state => {
  return {};
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
