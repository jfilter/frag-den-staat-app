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
import moment from 'moment';
import { SearchBar } from 'react-native-elements';

class SearchStartScreen extends React.Component {
  render() {
    return (
      <View>
        <SearchBar
          onChangeText={() => console.log('x')}
          placeholder="Type Here..."
          onSubmitEditing={this.props.navigateToResults}
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
    navigateToResults: params =>
      dispatch(NavigationActions.navigate({ routeName: 'SearchResults' })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchStartScreen);
