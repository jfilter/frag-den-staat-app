import { ListItem, Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import { renderFooter, renderSeparator } from '../../components/ListRenderer';
import {
  searchPublicBodies,
  searchPublicBodiesErrorClearAction,
} from '../../actions/search';
import { styles } from './styles';
import listItemStyles from '../../components/ListRenderer/styles';
import I18n from '../../i18n';

class SearchResultsPublicBodiesMasterScreen extends React.Component {
  componentDidMount() {
    this.props.doSearch();
  }

  _renderItem = ({ item }) => {
    const subtittle = `${item.jurisdiction.name}, ${I18n.t('countingRequests', {
      count: item.number_of_requests,
    })}`;

    return (
      <ListItem
        title={item.name}
        subtitle={subtittle}
        titleNumberOfLines={3}
        containerStyle={listItemStyles.listItemContainer}
        onPress={() => this.props.navigateToDetails({ publicBody: item })}
      />
    );
  };

  _renderSeparator = () => renderSeparator();

  _renderFooter = () => renderFooter(this.props.isPending);

  render() {
    return (
      <View style={styles.background}>
        <FlatList
          data={this.props.results}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          ListFooterComponent={this._renderFooter}
        />
      </View>
    );
  }
}

SearchResultsPublicBodiesMasterScreen.navigationOptions = ({ navigation }) => {
  const query = navigation.state.params.query;
  return {
    title: `"${query}"`,
    tabBarLabel: 'Public Bodies',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="account-balance" color={tintColor} />
    ),
  };
};

const mapStateToProps = (state, props) => {
  return {
    isPending: state.search.publicBodiesIsPending,
    results: state.search.publicBodiesResults,
    query: props.navigation.state.params.query,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearError: () => dispatch(searchPublicBodiesErrorClearAction()),
    doSearch: () => dispatch(searchPublicBodies()),
    navigateToDetails: params =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'SearchPublicBodyDetails',
          params,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchResultsPublicBodiesMasterScreen
);
