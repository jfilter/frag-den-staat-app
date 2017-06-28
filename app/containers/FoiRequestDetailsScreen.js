import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import publicBodyFile from '../../scraper/public_bodies/public_bodies_cleaned.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class FoiRequestDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: `Request #${navigation.state.params.id}`,
    // headerRight: <Button color={screenProps.tintColor} {...} />,
  });

  render() {
    return (
      <View>
        <Text>Details</Text>
        <Text>
          {this.props.navigation.state.params.indexInArray}
        </Text>
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
  FoiRequestDetailsScreen
);
