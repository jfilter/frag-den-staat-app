import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import { fetchSingleFoiRequest } from '../../actions/singleFoiRequest';
import FoiRequestDetails from '../../components/screens/FoiRequestDetails';

// eslint-disable-next-line react/prop-types
const FoiRequestsDetailsScreen = ({
  request,
  messages,
  fetchSingleFoiRequest,
  navigateToPdfViewer,
  navigateToPublicBody,
}) => (
  <FoiRequestDetails
    request={request}
    messages={messages}
    fetchSingleFoiRequest={fetchSingleFoiRequest}
    navigateToPdfViewer={navigateToPdfViewer}
    navigateToPublicBody={navigateToPublicBody}
  />
);

FoiRequestsDetailsScreen.navigationOptions =
  FoiRequestDetails.navigationOptions;

const mapStateToProps = (state, props) => {
  return {
    request: props.navigation.state.params.request,
    messages:
      state.singleFoiRequest.foiRequest != null
        ? state.singleFoiRequest.foiRequest.messages
        : null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleFoiRequest: urls => dispatch(fetchSingleFoiRequest(urls)),
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

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestsDetailsScreen
);
