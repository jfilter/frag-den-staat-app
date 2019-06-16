import { ListItem, Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import { fontColor, greyDark } from '../../globals/colors';
import {
  searchPublicBodies,
  searchPublicBodiesErrorClearAction,
} from '../../actions/search';
import I18n from '../../i18n';
import ListFooter from '../../components/library/ListFooter';
import Seperator from '../../components/library/Seperator';
import listItemStyles from '../../components/library/ListItem/styles';
import styles from './styles';

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
        titleStyle={{ fontSize: 15, fontWeight: 'bold', color: fontColor }}
        subtitleStyle={{ fontSize: 13, fontWeight: 'bold', color: greyDark }}
        onPress={() => this.props.navigateToDetails({ publicBody: item })}
      />
    );
  };

  _renderFooter = () => <ListFooter isPending={this.props.isPending} />;

  render() {
    return (
      <View style={styles.background}>
        <FlatList
          data={this.props.results}
          renderItem={this._renderItem}
          ItemSeparatorComponent={Seperator}
          ListFooterComponent={this._renderFooter}
        />
      </View>
    );
  }
}

SearchResultsPublicBodiesMasterScreen.navigationOptions = {
  tabBarLabel: I18n.t('publicBodies'),
  tabBarIcon: ({ tintColor }) => (
    <Icon name="account-balance" color={tintColor} />
  ),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsPublicBodiesMasterScreen);
