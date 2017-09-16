import { ListItem, Icon } from 'react-native-elements';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import { foiRequestsFilterChange } from '../../actions/foiRequests';
import { getItemById, shortenJurisdiction } from '../../utils';
import { renderSeparator } from '../../components/ListRenderer';
import { styles } from './styles';
import jurisdictionList from '../../data/jurisdiction';

class FoiRequestsFilterJurisdictionScreen extends React.Component {
  _onSwitch = (id, switched) => {
    let newFilter = { jurisdiction: null };

    if (!switched) {
      const label = shortenJurisdiction(
        jurisdictionList.find(getItemById(id)).name
      );

      newFilter = { jurisdiction: { param: id, label } };
    }
    this.props.changeFilter(newFilter);
  };

  _renderItem = ({ item }) => {
    const { currentFilter } = this.props;
    const switched = currentFilter !== null && currentFilter.param === item.id;
    return (
      <ListItem
        title={item.name}
        key={item.id}
        hideChevron
        switchButton
        switched={switched}
        onSwitch={() => this._onSwitch(item.id, switched)}
        containerStyle={styles.filterItemContainer}
      />
    );
  };

  render() {
    return (
      <View style={styles.background}>
        <FlatList
          data={jurisdictionList}
          extraData={this.props.currentFilter}
          renderItem={this._renderItem}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    );
  }
}

FoiRequestsFilterJurisdictionScreen.navigationOptions = {
  title: 'Filter',
  tabBarLabel: 'Jurisdiction',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="scale-balance" type="material-community" color={tintColor} />
  ),
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
