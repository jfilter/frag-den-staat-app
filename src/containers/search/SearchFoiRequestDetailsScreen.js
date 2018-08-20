// not sure why this is needed here but the app crashes if if not
// present (on Android)
import 'moment/locale/de';

import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import { fetchSingleFoiRequest } from '../../actions/singleFoiRequest';
import FoiRequestDetails from '../../components/screens/FoiRequestDetails';

// eslint-disable-next-line react/prop-types
const SearchFoiRequestDetails = ({
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

SearchFoiRequestDetails.navigationOptions = FoiRequestDetails.navigationOptions;

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
          routeName: 'SearchPdfViewer',
          params,
        })
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFoiRequestDetails);
