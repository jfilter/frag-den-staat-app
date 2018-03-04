import { Dimensions, FlatList, Platform, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import Seperator from '../Seperator';
import ListItemRadioButton from '../ListItemRadioButton';
import BlankContainer from '../BlankContainer';

class FilterDropDown extends React.Component {
  _onSwitch = ({ param, label }, switched) => {
    const { filterFor } = this.props;
    // clean old values or set new ones
    const newFilter = {
      [filterFor]: switched ? null : { param, label },
    };

    this.props.updateFilter(newFilter);
  };

  _renderItem = ({ item }) => {
    const { currentFilter } = this.props;
    const switched =
      currentFilter !== null && currentFilter.param === item.param;

    return (
      <ListItemRadioButton
        key={item.param}
        title={item.label}
        onSwitch={() => this._onSwitch(item, switched)}
        switched={switched}
      />
    );
  };

  render() {
    const { filterOptions, currentFilter } = this.props;

    const bottomBarHeight = 56;
    const statusBarHeight =
      Platform.OS === 'android' ? StatusBar.currentHeight : 0;

    const ScreenHeight =
      Dimensions.get('window').height - bottomBarHeight - 100 - statusBarHeight; // approx. offset to top

    return (
      <BlankContainer outerStyle={{ height: ScreenHeight }}>
        <FlatList
          bounces={false}
          ItemSeparatorComponent={Seperator}
          data={filterOptions}
          extraData={currentFilter}
          renderItem={this._renderItem}
        />
      </BlankContainer>
    );
  }
}

FilterDropDown.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      param: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  updateFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.shape({
    param: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  filterFor: PropTypes.string.isRequired,
};

FilterDropDown.defaultProps = {
  currentFilter: null,
};

export default FilterDropDown;
