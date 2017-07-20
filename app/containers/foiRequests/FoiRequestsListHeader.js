import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import jurisdictionFile from '../../data/jurisdiction.json';
import statusFile from '../../data/status.json';
import { getItemById, mapToRealStatus, shortenJurisdiction } from '../../utils';
import { primaryColor, greyDark, greyLight, grey } from '../../styles/colors';

class FoiRequestsListHeader extends React.Component {
  render() {
    const filterJurisdiction = this.props.filter.jurisdiction;
    let filterJurisdictionText = 'ALL';

    if (filterJurisdiction) {
      const jurisdictionName = jurisdictionFile.find(
        getItemById(filterJurisdiction)
      ).name;

      filterJurisdictionText = shortenJurisdiction(
        jurisdictionName
      ).toUpperCase();
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
            <TouchableHighlight
              onPress={this.props.navigateToFilterJurisdiction}
              underlayColor={grey}
            >
              <View>
                <View style={styles.align}>
                  <Text style={styles.label}>JURISDICTION</Text>
                  <Icon
                    name="arrow-drop-down"
                    color={greyDark}
                    height={20}
                    width={20}
                  />
                </View>
                <Text style={styles.selection}>
                  {filterJurisdictionText}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.item}>
            <TouchableHighlight onPress={this.props.navigateToFilterStatus}>
              <View>
                <View style={styles.align}>
                  <Text style={styles.label}>STATUS</Text>
                  <Icon
                    name="arrow-drop-down"
                    color={greyDark}
                    height={20}
                    width={20}
                  />
                </View>
                <Text style={styles.selection}>
                  {filterStatusText}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.item}>
            <TouchableHighlight onPress={this.props.navigateToFilterCategory}>
              <View>
                <View style={styles.align}>
                  <Text style={styles.label}>CATEGORY</Text>
                  <Icon
                    name="arrow-drop-down"
                    color={greyDark}
                    height={20}
                    width={20}
                  />
                </View>
                <Text style={styles.selection}>
                  {filterCategoryText}
                </Text>
              </View>
            </TouchableHighlight>
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
    navigateToFilterJurisdiction: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'FoiRequestsFilterJurisdiction',
        })
      ),
    navigateToFilterStatus: () =>
      dispatch(
        NavigationActions.navigate({ routeName: 'FoiRequestsFilterStatus' })
      ),
    navigateToFilterCategory: () =>
      dispatch(
        NavigationActions.navigate({ routeName: 'FoiRequestsFilterCategory' })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsListHeader
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: greyLight,
  },
  item: {
    flexGrow: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: greyLight,
    paddingHorizontal: 10,
    paddingBottom: 5,
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
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
