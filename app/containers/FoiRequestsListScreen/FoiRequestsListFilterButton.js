import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { primaryColor } from '../../styles/colors';

const FoiRequestsListFilterButton = ({ navigateToFilter }) =>
  <Icon
    name="filter-list"
    color={primaryColor}
    size={30}
    onPress={navigateToFilter}
    containerStyle={{
      paddingVertical: 7,
      paddingHorizontal: 20,
    }}
  />;

FoiRequestsListFilterButton.propTypes = {
  navigateToFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToFilter: () =>
      dispatch(NavigationActions.navigate({ routeName: 'Filter' })),
  };
};

export default connect(null, mapDispatchToProps)(FoiRequestsListFilterButton);
