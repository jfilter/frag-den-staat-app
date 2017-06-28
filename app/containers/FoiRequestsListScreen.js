import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import {
  foiRequestsFetchFirstData,
  foiRequestsFetchMoreData,
} from '../actions/foiRequests';
import publicBodyFile from '../../scraper/public_bodies/public_bodies_cleaned.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class FoiRequestsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this._fetchMoreData = this._fetchMoreData.bind(this);
  }

  componentWillMount() {
    this.props.fetchFirstData();
  }

  _fetchMoreData() {
    if (!this.props.isPending) {
      this.props.fetchMoreData(this.props.nextUrl);
    }
  }

  _renderPendingActivity = () => {
    if (!this.props.isPending) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _renderItem = ({ item, index }) => {
    const imagePath = `${item.status}`;
    const lastContact = item.last_message || item.first_message;
    const timeAgo = moment(lastContact).fromNow();
    let subtitle = `${item.status}, ${timeAgo}`;

    if (item.public_body) {
      const startToSlice = '/api/v1/publicbody/'.length;
      const endSlice = item.public_body.length - 1;
      const publicBodyId = item.public_body.slice(startToSlice, endSlice);
      const publicBodyObject = publicBodyFile[publicBodyId];
      const publicBodyName = publicBodyObject.publicBodyName;
      const jurisdictionName = publicBodyObject.jurisdictionName;

      subtitle += `\n${publicBodyName} (${jurisdictionName})`;
    }

    return (
      <ListItem
        key={item.id}
        title={item.title}
        titleNumberOfLines={3}
        subtitle={subtitle}
        subtitleNumberOfLines={3}
        avatar={{
          uri: imagePath,
        }}
        onPress={() =>
          this.props.navigateToDetails({ indexInArray: index, id: item.id })}
        // avatarStyle={{ marginTop: 20 }}
        // TODO: Not possible right now, come back later to check if they have fixed it.
        // avatarStyle={{ overlayContainerStyle: { backgroundColor: 'white' } }}
        containerStyle={{ alignItems: 'center', justifyContent: 'center' }}
      />
    );
  };

  render() {
    if (this.props.error !== '') {
      return (
        <View>
          <Text>ERROR!</Text>
          <Text>
            {this.props.error}
          </Text>
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={this.props.requests}
          renderItem={this._renderItem}
          onEndReached={this._fetchMoreData}
          onEndReachedThreshold={0}
          ListFooterComponent={this._renderPendingActivity}
          style={{ backgroundColor: 'white' }} // this fixes a bug with not appearing activity spinner
        />
      </View>
    );
  }
}

FoiRequestsListScreen.navigationOptions = {
  title: 'Requests',
};

const mapStateToProps = state => {
  return {
    requests: state.foiRequests.requests,
    error: state.foiRequests.error,
    isPending: state.foiRequests.isPending,
    nextUrl: state.foiRequests.nextUrl,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFirstData: () => dispatch(foiRequestsFetchFirstData()),
    fetchMoreData: nextUrl => dispatch(foiRequestsFetchMoreData(nextUrl)),
    navigateToDetails: params =>
      dispatch(NavigationActions.navigate({ routeName: 'Details', params })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsListScreen
);
