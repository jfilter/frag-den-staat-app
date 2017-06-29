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

class FoiRequestDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const requestId = navigation.state.params.id;
    function share() {
      Share.share(
        {
          message: 'LOL WAT? Check out this FOI request!',
          url: `https://fragdenstaat.de/a/${requestId}`,
          title: 'FragDenStaat.de', // What's the purpose?
        },
        {
          // Android only:
          dialogTitle: 'FragDenStaat.de',
        }
      );
    }

    return {
      title: `Request #${requestId}`,
      headerRight: (
        <Icon
          name="ios-share-outline"
          type="ionicon"
          color={primaryColor}
          size={30}
          onPress={share}
          containerStyle={{
            paddingVertical: 7,
            paddingHorizontal: 20,
          }}
        />
      ),
    };
  };

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
