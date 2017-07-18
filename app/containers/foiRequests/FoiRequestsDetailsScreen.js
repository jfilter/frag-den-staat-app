import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import FoiRequestSingle from '../../components/FoiRequestSingle';

class FoiRequestsDetailsScreen extends React.Component {
  render() {
    return (
      <FoiRequestSingle
        request={this.props.request}
        navigateToPdfViewer={this.props.navigateToPdfViewer}
      />
    );
  }
}

FoiRequestsDetailsScreen.navigationOptions = FoiRequestSingle.navigationOptions;

const mapStateToProps = (state, props) => {
  return {
    request: props.navigation.state.params.request,
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
