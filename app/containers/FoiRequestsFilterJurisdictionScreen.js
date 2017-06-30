import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon, Text } from 'react-native-elements';

import jurisdictionList from '../data/jurisdiction';
import { foiRequestsFilterChange } from '../actions/foiRequests';

class FoiRequestsFilterJurisdictionScreen extends React.Component {
  _onSwitch = (id, switched) => {
    let newFilter = { jurisdiction: null };

    if (!switched) {
      newFilter = { jurisdiction: id };
    }
    this.props.changeFilter(newFilter);
  };

  _renderItem = ({ item }) => {
    const switched = this.props.currentFilter === item.id;
    return (
      <ListItem
        title={item.name}
        key={item.id}
        hideChevron
        switchButton
        switched={switched}
        onSwitch={() => this._onSwitch(item.id, switched)}
      />
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={jurisdictionList}
          extraData={this.props.currentFilter}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

FoiRequestsFilterJurisdictionScreen.navigationOptions = {
  title: 'Filter',
  tabBarLabel: 'Jurisdiction',
  tabBarIcon: ({ tintColor }) =>
    <Icon name="scale-balance" type="material-community" color={tintColor} />,
};

const mapStateToProps = state => {
  return {
    currentFilter: state.foiRequests.filter.jurisdiction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: filter => dispatch(foiRequestsFilterChange(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsFilterJurisdictionScreen
);
