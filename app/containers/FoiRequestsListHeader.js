import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import jurisdictionFile from '../data/jurisdiction.json';
import statusFile from '../data/status.json';
import { getItemById, mapToRealStatus } from '../utils';

class FoiRequestsListHeader extends React.Component {
  render() {
    const filterJurisdiction = this.props.filter.jurisdiction;
    let filterJurisdictionText = 'all';

    if (filterJurisdiction) {
      const jurisdictionName = jurisdictionFile.find(
        getItemById(filterJurisdiction)
      ).name;
      filterJurisdictionText = `only ${jurisdictionName}`;
    }

    const filterStatus = this.props.filter.status;
    let filterStatusText = 'all';

    if (filterStatus) {
      const statusName = statusFile.find(getItemById(filterStatus)).name;
      filterStatusText = `only ${statusName}`;
    }

    const filterCategory = this.props.filter.Category;
    let filterCategoryText = 'all';

    if (filterCategory) {
      // const categoryName = CategoryFile.find(getItemById(filterCategory)).name;
      const categoryName = 'Category'; // TODO
      filterCategoryText = `only ${categoryName}`;
    }

    const nResultsText =
      this.props.nResults !== -1 ? `${this.props.nResults} Requests` : null;

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text>Jurisdiction</Text>
            <Text>
              {filterJurisdictionText}
            </Text>
          </View>
          <View>
            <Text>Status</Text>
            <Text>
              {filterStatusText}
            </Text>
          </View>
          <View>
            <Text>Category</Text>
            <Text>
              {filterCategoryText}
            </Text>
          </View>
        </View>
        <Text>
          {nResultsText}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    filter: state.foiRequests.filter,
    nResults: state.foiRequests.nResults,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToFilter: () =>
      dispatch(NavigationActions.navigate({ routeName: 'Filter' })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsListHeader
);
