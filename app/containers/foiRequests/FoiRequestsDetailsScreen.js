import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import FoiRequestDetails from '../../components/library/FoiRequestDetails';

// eslint-disable-next-line react/prop-types
const FoiRequestsDetailsScreen = ({
  request,
  navigateToPdfViewer,
  navigateToPublicBody,
}) => (
  <FoiRequestDetails
    request={request}
    navigateToPdfViewer={navigateToPdfViewer}
    navigateToPublicBody={navigateToPublicBody}
  />
);

FoiRequestsDetailsScreen.navigationOptions =
  FoiRequestDetails.navigationOptions;

const mapStateToProps = (state, props) => {
  return {
    request: props.navigation.state.params.request,
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
