import { Icon } from 'react-native-elements';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import { foiRequestsFilterChange } from '../../actions/foiRequests';
import Seperator from '../../components/library/Seperator';
import { styles } from './styles';
import I18n from '../../i18n/';
import ListItemRadioButton from '../../components/library/ListItemRadioButton';
import statusList from '../../data/status.json';

// remove 'overdue' and 'with costs' because it is not implemented yet.
statusList.pop();
statusList.pop();

class FoiRequestsFilterStatusScreen extends React.Component {
  _onSwitch = (id, switched) => {
    let newFilter = { status: null };

    if (!switched) {
      newFilter = { status: { param: id, label: I18n.t(id) } };
    }
    this.props.changeFilter(newFilter);
  };

  _renderItem = ({ item }) => {
    const { currentFilter } = this.props;
    const switched = currentFilter !== null && currentFilter.param === item.id;

    return (
      <ListItemRadioButton
        key={item.id}
        title={I18n.t(item.id)}
        onSwitch={() => this._onSwitch(item.id, switched)}
        switched={switched}
      />
    );
  };

  render() {
    return (
      <View style={styles.background}>
        <FlatList
          ItemSeparatorComponent={Seperator}
          data={statusList}
          extraData={this.props.currentFilter}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

FoiRequestsFilterStatusScreen.navigationOptions = {
  title: I18n.t('filter'),
  tabBarLabel: I18n.t('status'),
  tabBarIcon: ({ tintColor }) => (
    <Icon name="chart-gantt" type="material-community" color={tintColor} />
  ),
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
