import React from 'react';
import { View, Text } from 'react-native';

class SearchResultsPublicBodiesScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Public Bodies</Text>
      </View>
    );
  }
}

SearchResultsPublicBodiesScreen.navigationOptions = {
  title: 'Public Bodies',
  tabBarLabel: 'Public Bodies',
  tabBarIcon: ({ tintColor }) =>
    <Icon name="chart-gantt" type="material-community" color={tintColor} />,
};

export default SearchResultsPublicBodiesScreen;
