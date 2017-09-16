import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import { foiRequestsFilterChange } from '../../actions/foiRequests';
import { greyDark, grey } from '../../styles/colors';
import { styles } from './styles';

class FoiRequestsListHeader extends React.Component {
  render() {
    const { jurisdiction, status, category, publicBody } = this.props.filter;

    const jurisdictionLabel = jurisdiction
      ? `${jurisdiction.label}`.toUpperCase()
      : 'ALL';

    const statusLabel = status ? `${status.label}`.toUpperCase() : 'ALL';

    // TODO
    const filterCategory = this.props.filter.category;
    let filterCategoryText = 'ALL';

    if (filterCategory) {
      // const categoryName = CategoryFile.find(getItemById(filterCategory)).name;
      const categoryName = 'Category'; // TODO
      filterCategoryText = `${categoryName}`.toUpperCase();
    }

    let jurisdictionTab = (
      <View style={styles.item}>
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
            <Text style={styles.selection}>{jurisdictionLabel}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );

    let categoryTab = (
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
            <Text style={styles.selection}>{filterCategoryText}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );

    let publicBodyTab;
    if (publicBody) {
      jurisdictionTab = null;
      categoryTab = null;

      publicBodyTab = (
        <View style={[styles.item, styles.publicBody]}>
          <View style={styles.align}>
            <View style={styles.pbLabel}>
              <Text style={styles.label}>PUBLIC BODY</Text>
              <Text style={styles.selection}>
                {publicBody.label.toUpperCase()}
              </Text>
            </View>
            <TouchableHighlight
              onPress={() => this.props.changeFilter({ publicBody: null })}
              underlayColor={grey}
              style={styles.pbCross}
            >
              <View>
                <Icon name="clear" color={greyDark} height={20} width={20} />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
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
                <Text style={styles.selection}>{statusLabel}</Text>
              </View>
            </TouchableHighlight>
          </View>
          {jurisdictionTab}
          {categoryTab}
          {publicBodyTab}
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
    changeFilter: newFilter => dispatch(foiRequestsFilterChange(newFilter)),
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
