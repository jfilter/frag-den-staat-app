import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import {
  renderNumberOfResultHeader,
  renderItem,
  renderFooter,
  renderSeparator,
} from '../../components/ListRenderer';
import {
  searchFoiRequests,
  searchFoiRequestsErrorClearAction,
} from '../../actions/search';
import { styles } from './styles';

class SearchResultsFoiRequestsScreen extends React.Component {
  componentDidMount() {
    this.props.doSearch();
  }

  _renderNumberOfResultHeader = () =>
    renderNumberOfResultHeader(this.props.results.length);

  _renderFooter = () => renderFooter(this.props.isPending);

  _renderItem = ({ item }) => {
    const onPress = () => this.props.navigateToDetails({ request: item });
    return renderItem(item, onPress);
  };

  _renderSeparator = () => renderSeparator();

  render() {
    return (
      <View style={styles.background}>
        <FlatList
          style={styles.listBackground}
          data={this.props.results}
          renderItem={this._renderItem}
          ListFooterComponent={this._renderFooter}
          // ListHeaderComponent={this._renderNumberOfResultHeader}
          ItemSeparatorComponent={this._renderSeparator}
        />
      </View>
    );
  }
}

SearchResultsFoiRequestsScreen.navigationOptions = ({ navigation }) => {
  const query = navigation.state.params.query;
  return {
    title: `"${query}"`,
    tabBarLabel: 'Requests',
    tabBarIcon: ({ tintColor }) => <Icon name="mail" color={tintColor} />,
  };
};

const mapStateToProps = (state, props) => {
  return {
    isPending: state.search.foiRequestsIsPending,
    results: state.search.foiRequestsResults,
    query: props.navigation.state.params.query,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearError: () => dispatch(searchFoiRequestsErrorClearAction()),
    doSearch: () => dispatch(searchFoiRequests()),
    navigateToDetails: params =>
      dispatch(
        NavigationActions.navigate({ routeName: 'SearchResultsSingle', params })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchResultsFoiRequestsScreen
);
