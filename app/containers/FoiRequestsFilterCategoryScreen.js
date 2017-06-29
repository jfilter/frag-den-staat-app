import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon, Text } from 'react-native-elements';

import publicBodyFile from '../../scraper/public_bodies/public_bodies_cleaned.json';
import jurisdictionList from '../data/jurisdiction';

// import Icon from 'react-native-vector-icons/Ionicons';

import { primaryColor } from '../styles/colors.js';

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
        <FlatList
          data={jurisdictionList}
          renderItem={({ item }) =>
            <ListItem
              title={item.name}
              key={item.id}
              hideChevron
              switchButton
            />}
        />
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsFilterCategoryScreen
);
