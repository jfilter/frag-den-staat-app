import {
  Alert,
  Animated,
  AsyncStorage,
  FlatList,
  Platform,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions, DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import cache from 'react-native-modest-cache';

import { LIST_HEADER_HEIGHT, styles } from './styles';
import {
  foiRequestsFetchData,
  foiRequestsRefreshData,
  foiRequestsErrorClearAction,
} from '../../actions/foiRequests';
import { primaryColor, primaryColorLight } from '../../globals/colors';
import FoiRequestsListHeader from './FoiRequestsListHeader';
import ListFooter from '../../components/library/ListFooter';
import ListHeader from '../../components/library/ListHeader';
import ListItem from '../../components/library/ListItem';
import NavBarIcon from '../../components/foiRequests/NavBarIcon';
import Seperator from '../../components/library/Seperator';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FoiRequestsMasterScreen extends React.Component {
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

  componentWillMount() {
    if (!this.props.onboardingFinished) {
      this.props.navigateToOnboarding();
    }
  }

  componentDidMount() {
    if (!this.props.isPending) {
      this.props.fetchData();
    }
  }

  componentDidUpdate() {
    // https://github.com/facebook/react-native/issues/1878
    if (
      Platform.OS === 'ios' &&
      this.props.requests.length <= 20 &&
      !this.props.isRefreshing &&
      !(this.props.isPending && this.props.requests.length !== 0)
    ) {
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
    cache.flush(); // NB: This deletes the *whole* cache and not only for the current filter
    this.props.refreshData();
  };

  _renderNumberOfResultHeader = () => (
    <ListHeader numResults={this.props.nResults} />
  );

  _renderFooter = () => <ListFooter isPending={this.props.isPending} />;

  _renderItem = ({ item }) => {
    const onPress = () => this.props.navigateToSingle({ request: item });
    return <ListItem item={item} onPress={onPress} />;
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
      const errorText = `Sorry, there has been an error with the message: '${
        this.props.error
      }'`;
      Alert.alert(
        'Error',
        errorText,
        [{ text: 'OK', onPress: this.props.clearError }],
        { cancelable: false }
      );
    }

    const androidContainerStyle =
      Platform.OS === 'android' ? { paddingTop: LIST_HEADER_HEIGHT } : null;

    return (
      <View style={styles.background}>
        <AnimatedFlatList
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this._refreshData}
              progressViewOffset={LIST_HEADER_HEIGHT}
              tintColor={primaryColorLight}
              progressBackgroundColor={primaryColorLight}
            />
          }
          contentInset={
            { top: LIST_HEADER_HEIGHT } // progresViewOffset for anodroid
          }
          data={
            this.props.requests // iOS
          }
          extraData={this.props.isPending}
          contentContainerStyle={androidContainerStyle}
          renderItem={this._renderItem}
          onEndReached={this._fetchData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this._renderFooter}
          ListHeaderComponent={this._renderNumberOfResultHeader}
          ItemSeparatorComponent={Seperator}
          ref={ref => (this.listRef = ref)}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: this.state.scrollAnim },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={10}
          style={
            { backgroundColor: 'white' } // this fixes a bug with not appearing activity spinner
          }
        />
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.View style={[styles.title, { opacity: headerOpacity }]}>
            <FoiRequestsListHeader />
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class MyIconLeft extends React.Component {
  navigateToFilter = () =>
    this.props.dispatch(
      DrawerActions.toggleDrawer({
        params: { filter: this.props.filter },
      })
    );
  render() {
    const { filterUser, currentUserId } = this.props;
    let secondIcon = null;

    if (filterUser != null) {
      if (currentUserId === filterUser) {
        secondIcon = { iconName: 'person' };
      } else {
        secondIcon = { iconName: 'wrench', iconType: 'font-awesome' };
      }
    }

    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <NavBarIcon
          onPress={this.navigateToFilter}
          iconName="menu"
          additionalStyles={{ marginHorizontal: 0, marginLeft: 5 }}
        />

        {secondIcon && (
          <NavBarIcon
            onPress={this.navigateToFilter}
            {...secondIcon}
            additionalStyles={{ marginHorizontal: 0, paddingHorizontal: 0 }}
            iconSize={20}
          />
        )}
      </View>
    );
  }
}

const MyConnectedIcon = connect(state => {
  return {
    filterUser: state.foiRequests.filter.user,
    currentUserId: state.authentication.userId,
  };
})(MyIconLeft);

FoiRequestsMasterScreen.navigationOptions = ({ navigation }) => {
  const navigateToOnboarding = () =>
    navigation.dispatch(
      NavigationActions.navigate({ routeName: 'FoiRequestsOnboarding' })
    );

  return {
    headerTitle: (
      <Text
        style={{
          fontFamily: 'Kreon-Bold',
          alignSelf: 'center',
          fontSize: Platform.OS === 'ios' ? 17 : 20,
          color: primaryColor,
          marginHorizontal: 16,
        }}
      >
        FragDenStaat
      </Text>
    ),
    headerBackTitle: null, // disables default
    headerRight: (
      <NavBarIcon onPress={navigateToOnboarding} iconName="info-outline" />
    ),
    headerLeft: <MyConnectedIcon />,
  };
};

FoiRequestsMasterScreen.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  requests: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  nResults: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  firstPageFetchedAt: PropTypes.number,
  error: PropTypes.string.isRequired,
  clearError: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
  navigateToSingle: PropTypes.func.isRequired,
  onboardingFinished: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    ...state.foiRequests,
    onboardingFinished: state.settings.onboardingFinished,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearError: () => dispatch(foiRequestsErrorClearAction()),
    fetchData: () => dispatch(foiRequestsFetchData()),
    refreshData: () => dispatch(foiRequestsRefreshData()),
    navigateToOnboarding: () =>
      dispatch(
        NavigationActions.navigate({ routeName: 'FoiRequestsOnboarding' })
      ),
    navigateToSingle: params =>
      dispatch(
        NavigationActions.navigate({ routeName: 'FoiRequestsDetails', params })
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiRequestsMasterScreen);
