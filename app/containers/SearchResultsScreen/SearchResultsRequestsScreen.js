import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

class SearchResultsRequestsScreen extends React.Component {
  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={() =>
            this.props.navigateToDetails({ request: this.props.requests[0] })}
        >
          <Text>Requests</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

SearchResultsRequestsScreen.navigationOptions = {
  title: 'Requests',
  tabBarLabel: 'Requests',
  tabBarIcon: ({ tintColor }) =>
    <Icon name="chart-gantt" type="material-community" color={tintColor} />,
};

const mapStateToProps = state => {
  return {
    ...state.foiRequests,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToDetails: params =>
      dispatch(
        NavigationActions.navigate({ routeName: 'SearchResultsSingle', params })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchResultsRequestsScreen
);
