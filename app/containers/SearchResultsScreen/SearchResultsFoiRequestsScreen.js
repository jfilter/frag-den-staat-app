import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

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

  _renderSeparator = renderSeparator;

  render() {
    return (
      <View>
        <FlatList
          data={this.props.results}
          renderItem={this._renderItem}
          renderFooter={this._renderFooter}
          renderSeparator={this._renderSeparator}
          renderHeader={this._renderNumberOfResultHeader}
        />
      </View>
    );
  }
}

SearchResultsFoiRequestsScreen.navigationOptions = {
  title: 'Requests',
  tabBarLabel: 'Requests',
  tabBarIcon: ({ tintColor }) =>
    <Icon name="chart-gantt" type="material-community" color={tintColor} />,
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
