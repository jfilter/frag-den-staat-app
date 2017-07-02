import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
  RefreshControl,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

import {
  foiRequestsFetchData,
  foiRequestsRefreshData,
  foiRequestsListHeaderToggle,
  foiRequestsErrorClearAction,
} from '../actions/foiRequests';
import publicBodyFile from '../../scraper/public_bodies/public_bodies_cleaned.json';
import jurisdictionFile from '../data/jurisdiction.json';
import statusFile from '../data/status.json';
import FoiRequestsListFilterButton from './FoiRequestsListFilterButton';
import { getItemById, mapToRealStatus } from '../utils';
import FoiRequestsListHeader from './FoiRequestsListHeader';
import { primaryColor, primaryColorLight, greyDark } from '../styles/colors';

const LIST_HEADER_HEIGHT = 64;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FoiRequestsListScreen extends React.Component {
  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim
        ),
        0,
        LIST_HEADER_HEIGHT
      ),
    };
  }

  componentDidMount() {
    this.props.fetchData();
  }

  componentDidUpdate() {
    // https://github.com/facebook/react-native/issues/1878
    if (this.props.requests.length <= 20) {
      this.listRef.getNode().scrollToOffset({
        offset: -LIST_HEADER_HEIGHT,
        animated: false,
      });
    }
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

  _renderNumberOfResultHeader = () => {
    const nResultsText =
      this.props.nResults !== -1 ? `${this.props.nResults} REQUESTS` : null;
    return (
      <Text style={styles.nResults}>
        {nResultsText}
      </Text>
    );
  };

  _renderPendingActivity = () => {
    if (!this.props.isPending) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
        }}
      >
        <ActivityIndicator animating size="large" color={primaryColorLight} />
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
        chevronColor={primaryColor}
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
    const { clampedScroll } = this.state;

    const headerTranslate = clampedScroll.interpolate({
      inputRange: [0, LIST_HEADER_HEIGHT],
      outputRange: [0, -LIST_HEADER_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerOpacity = clampedScroll.interpolate({
      inputRange: [0, LIST_HEADER_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const hasError = this.props.error !== '';
    if (hasError) {
      const errorText = `Sorry, there has been an error with the message '${this
        .props.error}'`;
      Alert.alert(
        'Error',
        errorText,
        [{ text: 'OK', onPress: this.props.clearError }],
        { cancelable: false }
      );
    }

    return (
      <View>
        <AnimatedFlatList
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this._refreshData}
              progressViewOffset={LIST_HEADER_HEIGHT}
              tintColor={primaryColorLight}
              progressBackgroundColor={primaryColorLight}
            />
          } // progresViewOffset for anodroid
          contentInset={{ top: LIST_HEADER_HEIGHT }} // iOS
          data={this.props.requests}
          renderItem={this._renderItem}
          onEndReached={this._fetchData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this._renderPendingActivity}
          ListHeaderComponent={this._renderNumberOfResultHeader}
          ref={ref => (this.listRef = ref)}
          // onRefresh={this._refreshData}
          // refreshing={this.props.isRefreshing}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={10} // iOS only, between onScroll calls are at least 500ms
          style={{ backgroundColor: 'white', marginTop: 0 }} // this fixes a bug with not appearing activity spinner
        />
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.View style={[styles.title, { opacity: headerOpacity }]}>
            <FoiRequestsListHeader
              onLayout={event => console.log(event.nativeEvent.layout.height)}
            />
          </Animated.View>
        </Animated.View>
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
    clearError: () => dispatch(foiRequestsErrorClearAction()),
    fetchData: () => dispatch(foiRequestsFetchData()),
    refreshData: () => dispatch(foiRequestsRefreshData()),
    navigateToDetails: params =>
      dispatch(NavigationActions.navigate({ routeName: 'Details', params })),
    toggleHeader: () => dispatch(foiRequestsListHeaderToggle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsListScreen
);

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: LIST_HEADER_HEIGHT,
  },
  nResults: {
    textAlign: 'center',
    color: greyDark,
    fontWeight: '400',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 5,
  },
});
