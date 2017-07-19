import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon, Text } from 'react-native-elements';

import { foiRequestsFilterChange } from '../../actions/foiRequests';

// import Icon from 'react-native-vector-icons/Ionicons';

import { primaryColor } from '../../styles/colors.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class FoiRequestsFilterCategoryScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Not yet implemented. Come back later. ;)</Text>
      </View>
    );
  }
}

FoiRequestsFilterCategoryScreen.navigationOptions = {
  title: 'Filter',
  tabBarLabel: 'Category',
  tabBarIcon: ({ tintColor }) =>
    <Icon
      name="format-list-bulleted-type"
      type="material-community"
      color={tintColor}
    />,
};
const mapStateToProps = state => {
  return {
    requests: state.foiRequests.requests,
    error: state.foiRequests.error,
    isPending: state.foiRequests.isPending,
    nextUrl: state.foiRequests.nextUrl,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: filter => dispatch(foiRequestsFilterChange(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsFilterCategoryScreen
);
