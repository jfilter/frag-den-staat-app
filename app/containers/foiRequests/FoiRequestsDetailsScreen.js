import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import { fetchMessages } from '../../actions/messages';
import FoiRequestDetails from '../../components/library/FoiRequestDetails';

// eslint-disable-next-line react/prop-types
const FoiRequestsDetailsScreen = ({
  request,
  messages,
  fetchMessages,
  navigateToPdfViewer,
  navigateToPublicBody,
}) => (
  <FoiRequestDetails
    request={request}
    messages={messages}
    fetchMessages={fetchMessages}
    navigateToPdfViewer={navigateToPdfViewer}
    navigateToPublicBody={navigateToPublicBody}
  />
);

FoiRequestsDetailsScreen.navigationOptions =
  FoiRequestDetails.navigationOptions;

const mapStateToProps = (state, props) => {
  return {
    request: props.navigation.state.params.request,
    messages: state.messages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: urls => dispatch(fetchMessages(urls)),
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
