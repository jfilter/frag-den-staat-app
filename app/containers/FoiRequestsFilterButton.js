import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import { primaryColor } from '../styles/colors';

class FoiRequestsFilterButton extends React.Component {
  render() {
    return (
      <Icon
        name="filter-list"
        color={primaryColor}
        size={30}
        onPress={() => this.props.navigateToFilter()}
        containerStyle={{
          paddingVertical: 7,
          paddingHorizontal: 20,
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    navigateToFilter: () =>
      dispatch(NavigationActions.navigate({ routeName: 'Filter' })),
  };
};

export default connect(null, mapDispatchToProps)(FoiRequestsFilterButton);
