import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import { getItemById, shortenJurisdiction } from '../../utils';
import { greyDark, grey } from '../../styles/colors';
import { styles } from './styles';
import jurisdictionFile from '../../data/jurisdiction.json';
import statusFile from '../../data/status.json';

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
            <TouchableHighlight
              onPress={this.props.navigateToFilterStatus}
              underlayColor={grey}
            >
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
            <TouchableHighlight
              onPress={this.props.navigateToFilterCategory}
              underlayColor={grey}
            >
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
