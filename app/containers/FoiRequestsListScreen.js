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
import jurisdictionFile from '../data/jurisdiction.json';
import statusFile from '../data/status.json';
import FoiRequestsListFilterButton from './FoiRequestsListFilterButton';
import { getItemById, mapToRealStatus } from '../utils';

class FoiRequestsListScreen extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  _fetchData = () => {
    if (!this.props.isPending) {
      const timeDif = Date.now() - this.props.firstPageFetchedAt;
      // Prevent fetching data twice on initalizition because the `onEndReachEd` event fires with an empy list
      // value in mili seconds
      if (timeDif > 1000) {
        this.props.fetchData();
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
    // fix because that it's complicated with the status. see utils/index.js for more information.
    const realStatus = mapToRealStatus(item.status, item.resolution);
    const imagePath = realStatus;
    const statusName = statusFile.find(getItemById(realStatus)).name;

    const lastContact = item.last_message || item.first_message;
    const timeAgo = moment(lastContact).fromNow();
    let subtitle = `${statusName}, ${timeAgo}`;

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

    let filterText = '';

    const filterJurisdiction = this.props.filter.jurisdiction;
    if (filterJurisdiction) {
      const jurisdictionName = jurisdictionFile.find(
        getItemById(filterJurisdiction)
      ).name;
      filterText += `filter jurisdiction: only ${jurisdictionName},`;
    }

    const filterStatus = this.props.filter.status;
    if (filterStatus) {
      const statusName = statusFile.find(getItemById(filterStatus)).name;
      filterText += `status: only ${statusName},`;
    }

    if (!filterText) {
      filterText = 'no filter';
    }

    return (
      <View>
        <View
          style={{
            // position: 'absolute',
            // top: 0,
            // height: 100,
          }}
        >
          <Text>
            {filterText}
          </Text>
          <Text>
            Num:{this.props.nResults}
          </Text>
        </View>
        <FlatList
          data={this.props.requests}
          renderItem={this._renderItem}
          onEndReached={this._fetchData}
          onEndReachedThreshold={0.5}
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
  headerRight: <FoiRequestsListFilterButton />,
};

const mapStateToProps = state => {
  return {
    ...state.foiRequests,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(foiRequestsFetchData()),
    refreshData: () => dispatch(foiRequestsRefreshData()),
    navigateToDetails: params =>
      dispatch(NavigationActions.navigate({ routeName: 'Details', params })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsListScreen
);
