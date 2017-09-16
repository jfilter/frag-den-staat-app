import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon, Text } from 'react-native-elements';

import { foiRequestsFilterChange } from '../../actions/foiRequests';
import { primaryColor } from '../../styles/colors.js';
import { styles } from './styles';

class FoiRequestsFilterCategoryScreen extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Text>Not yet implemented. Come back later. ;)</Text>
      </View>
    );
  }
}

FoiRequestsFilterCategoryScreen.navigationOptions = {
  title: 'Filter',
  tabBarLabel: 'Category',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      name="format-list-bulleted-type"
      type="material-community"
      color={tintColor}
    />
  ),
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: filter => dispatch(foiRequestsFilterChange(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsFilterCategoryScreen
);
