import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import { Share } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import publicBodyFile from '../../scraper/public_bodies/public_bodies_cleaned.json';

// import Icon from 'react-native-vector-icons/Ionicons';

import { primaryColor } from '../styles/colors.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class FoiRequestsFilterScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Filter</Text>
        <Text />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    requests: state.foiRequests.requests,
    error: state.foiRequests.error,
    isPending: state.foiRequests.isPending,
    nextUrl: state.foiRequests.nextUrl,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsFilterScreen
);
