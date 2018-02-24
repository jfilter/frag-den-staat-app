import { Animated, Easing, TouchableHighlight, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Collapsible from 'react-native-collapsible';
import React from 'react';

import { foiRequestsFilterChange } from '../../actions/foiRequests';
import { getFilterableStatus, shortenLabel } from '../../utils';
import { grey, greyDark, primaryColor, greyLight } from '../../globals/colors';
import { styles } from './styles';
import FilterDropDown from '../../components/library/FilterDropDown';
import FilterDropDownButton from '../../components/library/FilterDropDownButton';
import I18n from '../../i18n';
import jurisdictionList from '../../data/jurisdiction.json';
import categoryList from '../../data/category.json';

const DROPDOWN_ANIMATION_DURATION = 300; // ms
const DROPDOWN_ANIMATION_PAUSE_BETWEEN_CHANGE = 100; // ms

const filterPossibilities = ['status', 'jurisdiction', 'category'];
const filterOptionsData = {
  status: getFilterableStatus().map(x => {
    return { param: x.id, label: I18n.t(x.id) };
  }),
  jurisdiction: jurisdictionList.map(x => {
    return { param: x.id, label: x.name };
  }),
  category: categoryList.map(x => {
    return { param: x, label: x };
  }),
};

class FoiRequestsListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: null,
      prevCollapsed: null,
      dropdownAnim: new Animated.Value(0),
    };
  }

  startExpanding() {
    Animated.timing(this.state.dropdownAnim, {
      toValue: 1,
      duration: DROPDOWN_ANIMATION_DURATION,
      easing: Easing.linear,
    }).start();
  }

  startCollapsing() {
    Animated.timing(this.state.dropdownAnim, {
      toValue: 0,
      duration: DROPDOWN_ANIMATION_DURATION,
      easing: Easing.linear,
    }).start();
  }

  styleActiveTab(x) {
    const border = this.state.dropdownAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 3],
    });

    if (
      (this.state.collapsed === null && this.state.prevCollapsed === x) ||
      this.state.collapsed === x
    ) {
      return { borderBottomWidth: border, borderBottomColor: primaryColor };
    }

    return {
      borderBottomWidth: 1,
      borderBottomColor: greyLight,
    };
  }

  _onPress(x) {
    if (this.state.collapsed === x) {
      this.setState(
        {
          prevCollapsed: x,
          collapsed: null,
          dropdownAnim: new Animated.Value(1),
        },
        () => this.startCollapsing()
      );
    } else if (this.state.collapsed === null) {
      this.setState(
        {
          prevCollapsed: null,
          collapsed: x,
          dropdownAnim: new Animated.Value(0),
        },
        () => this.startExpanding()
      );
    } else {
      this.setState(
        {
          prevCollapsed: this.state.collapsed,
          collapsed: null,
          dropdownAnim: new Animated.Value(1),
        },
        () => this.startCollapsing()
      );
      setTimeout(() => {
        this.setState(
          {
            prevCollapsed: null,
            collapsed: x,
            dropdownAnim: new Animated.Value(0),
          },
          () => this.startExpanding()
        );
      }, DROPDOWN_ANIMATION_DURATION + DROPDOWN_ANIMATION_PAUSE_BETWEEN_CHANGE);
    }
  }

  render() {
    const { filter, updateFilter } = this.props;

    // special tab for public body, somehwat hacky
    const publicBodyTab = filter.publicBody && (
      <View style={[styles.item, styles.publicBody]}>
        <View style={styles.align}>
          <View style={styles.pbLabel}>
            <Text style={styles.label}>
              {I18n.t('publicBody').toUpperCase()}
            </Text>
            <Text style={styles.selection} numberOfLines={2}>
              {filter.publicBody.label.toUpperCase()}
            </Text>
          </View>
          <TouchableHighlight
            onPress={() => this.props.updateFilter({ publicBody: null })}
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

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {filterPossibilities.map(
            x =>
              publicBodyTab && x !== 'status' ? null : (
                <FilterDropDownButton
                  containerStyles={this.styleActiveTab(x)}
                  dropdownAnim={
                    (this.state.collapsed === x ||
                      this.state.prevCollapsed === x) &&
                    this.state.dropdownAnim
                  }
                  filterFor={I18n.t(x)}
                  selection={
                    filter[x]
                      ? `${shortenLabel(filter[x].label, x)}`
                      : I18n.t('all')
                  }
                  onPress={() => this._onPress(x)}
                />
              )
          )}
          {publicBodyTab}
        </View>
        <View>
          {filterPossibilities.map(x => (
            <Collapsible
              collapsed={!this.state.collapsed || this.state.collapsed !== x}
              duration={DROPDOWN_ANIMATION_DURATION}
              easing="linear"
            >
              <FilterDropDown
                filterOptions={filterOptionsData[x]}
                updateFilter={updateFilter}
                currentFilter={filter[x]}
                filterFor={x}
              />
            </Collapsible>
          ))}
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
    updateFilter: newFilter => dispatch(foiRequestsFilterChange(newFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsListHeader
);
