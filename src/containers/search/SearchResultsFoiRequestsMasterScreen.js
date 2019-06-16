import { FlatList, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import {
  searchFoiRequests,
  searchFoiRequestsErrorClearAction,
} from '../../actions/search';
import styles from './styles';
import ListFooter from '../../components/library/ListFooter';
import ListHeader from '../../components/library/ListHeader';
import ListItem from '../../components/library/ListItem';
import Seperator from '../../components/library/Seperator';
import I18n from '../../i18n';

class SearchResultsFoiRequestsMasterScreen extends React.Component {
  componentDidMount() {
    this.props.doSearch();
  }

  _renderNumberOfResultHeader = () => (
    <ListHeader numResults={this.props.results.length} />
  );

  _renderFooter = () => <ListFooter isPending={this.props.isPending} />;

  _renderItem = ({ item }) => {
    const onPress = () => this.props.navigateToSingle({ request: item });
    return <ListItem item={item} onPress={onPress} />;
  };

  render() {
    return (
      <View style={styles.background}>
        <FlatList
          style={styles.listBackground}
          data={this.props.results}
          renderItem={this._renderItem}
          ListFooterComponent={this._renderFooter}
          // ListHeaderComponent={this._renderNumberOfResultHeader}
          ItemSeparatorComponent={Seperator}
        />
      </View>
    );
  }
}

SearchResultsFoiRequestsMasterScreen.navigationOptions = {
  tabBarLabel: I18n.t('requests'),
  tabBarIcon: ({ tintColor }) => <Icon name="mail" color={tintColor} />,
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
    navigateToSingle: params =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'SearchFoiRequestDetails',
          params,
        })
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsFoiRequestsMasterScreen);
