import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import { fetchSingleFoiRequest } from '../../actions/singleFoiRequest';
import { primaryColorLight } from '../../globals/colors';
import FoiRequestDetails from '../../components/screens/FoiRequestDetails';

// eslint-disable-next-line react/prop-types
class FoiRequestSingle extends React.Component {
  componentDidMount() {
    this.props.fetchSingleFoiRequest(this.props.foiRequestId);
  }

  render() {
    const {
      navigateToPdfViewer,
      navigateToPublicBody,
      isPending,
      error,
      foiRequest,
    } = this.props;

    if (error) {
      return (
        <View>
          <Text>Error: {error}</Text>
        </View>
      );
    }

    if (!foiRequest || isPending) {
      return (
        <View
          style={{ backgroundColor: 'white', paddingTop: 10, height: '100%' }}
        >
          <ActivityIndicator animating size="large" color={primaryColorLight} />
        </View>
      );
    }

    return (
      <FoiRequestDetails
        request={foiRequest}
        messages={foiRequest.messages} // a hack
        law={foiRequest.law}
        fetchMessages={null} // messages are already present
        navigateToPdfViewer={navigateToPdfViewer}
        navigateToPublicBody={navigateToPublicBody}
      />
    );
  }
}

FoiRequestSingle.navigationOptions = FoiRequestDetails.navigationOptions;

const mapStateToProps = (state, props) => {
  return {
    foiRequest: state.singleFoiRequest.foiRequest,
    isPending: state.singleFoiRequest.isPending,
    error: state.singleFoiRequest.error,
    foiRequestId: props.navigation.state.params.foiRequestId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleFoiRequest: id => dispatch(fetchSingleFoiRequest(id)),
    navigateToPublicBody: params =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'FoiRequestsPublicBody',
          params,
        })
      ),
    navigateToPdfViewer: params =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'FoiRequestsPdfViewer',
          params,
        })
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoiRequestSingle);
