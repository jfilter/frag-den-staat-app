import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

import {
  foiRequestsFetchData,
  foiRequestsRefreshData,
} from '../actions/foiRequests';
import publicBodyFile from '../../scraper/public_bodies/public_bodies_cleaned.json';
import FoiRequestsFilterButton from './FoiRequestsFilterButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class FoiRequestsListScreen extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  _fetchData = () => {
    if (!this.props.isPending) {
      const timeDif = Date.now() - this.props.firstPageFetchedAt;
      // Prevent fetching data twice on initalizition because the `onEndReachEd` event fires with an empy list
      if (timeDif > 2000) {
        this.props.fetchData(this.props.nextUrl);
      }
    }
  };

  _refreshData = () => {
    this.props.refreshData();
  };

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
          onEndReached={this._fetchData}
          onEndReachedThreshold={0}
          ListFooterComponent={this._renderPendingActivity}
          onRefresh={this._refreshData}
          refreshing={this.props.isRefreshing}
          style={{ backgroundColor: 'white' }} // this fixes a bug with not appearing activity spinner
        />
      </View>
    );
  }
}

FoiRequestsListScreen.navigationOptions = {
  title: 'Requests',
  headerRight: <FoiRequestsFilterButton />,
};

const mapStateToProps = state => {
  return {
    requests: state.foiRequests.requests,
    error: state.foiRequests.error,
    isPending: state.foiRequests.isPending,
    nextUrl: state.foiRequests.nextUrl,
    isRefreshing: state.foiRequests.isRefreshing,
    firstPageFetchedAt: state.foiRequests.firstPageFetchedAt,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: nextUrl => dispatch(foiRequestsFetchData(nextUrl)),
    refreshData: () => dispatch(foiRequestsRefreshData()),
    navigateToDetails: params =>
      dispatch(NavigationActions.navigate({ routeName: 'Details', params })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsListScreen
);
