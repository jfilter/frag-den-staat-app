import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import jurisdictionFile from '../data/jurisdiction.json';
import statusFile from '../data/status.json';
import { getItemById, mapToRealStatus } from '../utils';
import { primaryColor, greyDark } from '../styles/colors';

class FoiRequestsListHeader extends React.Component {
  render() {
    const filterJurisdiction = this.props.filter.jurisdiction;
    let filterJurisdictionText = 'ALL';

    if (filterJurisdiction) {
      const jurisdictionName = jurisdictionFile.find(
        getItemById(filterJurisdiction)
      ).name;
      filterJurisdictionText = `${jurisdictionName}`.toUpperCase();
    }

    const filterStatus = this.props.filter.status;
    let filterStatusText = 'ALL';

    if (filterStatus) {
      const statusName = statusFile.find(getItemById(filterStatus)).name;
      filterStatusText = `${statusName}`.toUpperCase();
    }

    const filterCategory = this.props.filter.Category;
    let filterCategoryText = 'ALL';

    if (filterCategory) {
      // const categoryName = CategoryFile.find(getItemById(filterCategory)).name;
      const categoryName = 'Category'; // TODO
      filterCategoryText = `${categoryName}`.toUpperCase();
    }

    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={[styles.item, styles.firstItem]}>
            <Text style={styles.label}>JURISDICTION</Text>
            <Text style={styles.selection}>
              {filterJurisdictionText}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>STATUS</Text>
            <Text style={styles.selection}>
              {filterStatusText}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>CATEGORY</Text>
            <Text style={styles.selection}>
              {filterCategoryText}
            </Text>
          </View>
        </View>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: greyDark,
    borderTopColor: greyDark,
  },
  item: {
    flexGrow: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: greyDark,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  firstItem: {
    borderLeftWidth: 0,
  },
  label: {
    fontSize: 12,
    color: greyDark,
  },
  selection: {
    color: primaryColor,
    fontSize: 12,
  },
});
