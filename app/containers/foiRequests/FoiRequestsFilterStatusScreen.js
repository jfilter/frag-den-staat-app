import { ListItem, Icon } from 'react-native-elements';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import { foiRequestsFilterChange } from '../../actions/foiRequests';
import { getItemById } from '../../utils';
import { renderSeparator } from '../../components/ListRenderer';
import { styles } from './styles';
import statusList from '../../data/status.json';

// remove overdue and 'with costs' because it is not implemented yet.
statusList.pop();
statusList.pop();

class FoiRequestsFilterStatusScreen extends React.Component {
  _onSwitch = (id, switched) => {
    let newFilter = { status: null };

    if (!switched) {
      const label = statusList.find(getItemById(id)).name;
      newFilter = { status: { param: id, label } };
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
        containerStyle={styles.filterItemContainer}
        onSwitch={() => this._onSwitch(item.id, switched)}
      />
    );
  };

  render() {
    return (
      <View style={styles.background}>
        <FlatList
          ItemSeparatorComponent={renderSeparator}
          data={statusList}
          extraData={this.props.currentFilter}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

FoiRequestsFilterStatusScreen.navigationOptions = {
  title: 'Filter',
  tabBarLabel: 'Status',
  tabBarIcon: ({ tintColor }) =>
    <Icon name="chart-gantt" type="material-community" color={tintColor} />,
};

const mapStateToProps = state => {
  return {
    currentFilter: state.foiRequests.filter.status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: filter => dispatch(foiRequestsFilterChange(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsFilterStatusScreen
);
