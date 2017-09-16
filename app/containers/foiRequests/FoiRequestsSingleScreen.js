import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import FoiRequestSingle from '../../components/FoiRequestSingle';

// eslint-disable-next-line react/prop-types
const FoiRequestsSingleScreen = ({
  request,
  navigateToPdfViewer,
  navigateToPublicBody,
}) => (
  <FoiRequestSingle
    request={request}
    navigateToPdfViewer={navigateToPdfViewer}
    navigateToPublicBody={navigateToPublicBody}
  />
);

FoiRequestsSingleScreen.navigationOptions = FoiRequestSingle.navigationOptions;

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
  FoiRequestsSingleScreen
);
