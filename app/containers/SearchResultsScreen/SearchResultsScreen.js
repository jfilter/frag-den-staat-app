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

class SearchResultsScreen extends React.Component {
  render() {
    return (
      <View>
        <SearchBar
          onChangeText={() => console.log('x')}
          placeholder="Type Here..."
        />
      </View>
    );
  }
}

SearchResultsScreen.navigationOptions = {
  title: 'Search',
};

SearchResultsScreen.propTypes = {};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchResultsScreen
);
