import React from 'react';
import { Button, Text, View } from 'react-native';

import { connect } from 'react-redux';
import { foiaRequestsFetchData } from '../actions/foiaRequests';

class FoiaRequestsListScreen extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    console.log(this.props);
    if (this.props.error !== '') {
      console.log(this.props.error);
      return (
        <View>
          <Text>ERROR!</Text>
          <Text>{this.props.error}</Text>
        </View>
      );
    }

    if (this.props.isPending) {
        return (<Text>Loading…</Text>);
    }

    return (
      <View>
        {this.props.requests.map((request) => (
          <Text key={request.id}>
            {request.id}
          </Text>
        ))}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requests: state.foiaRequests.requests,
    error: state.foiaRequests.error,
    isPending: state.foiaRequests.isPending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(foiaRequestsFetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoiaRequestsListScreen);
