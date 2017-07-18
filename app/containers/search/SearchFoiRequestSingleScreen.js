import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import FoiRequestSingle from '../../components/FoiRequestSingle';

// eslint-disable-next-line react/prop-types
const SearchFoiRequestSingle = ({ request, navigateToPdfViewer }) =>
  <FoiRequestSingle
    request={request}
    navigateToPdfViewer={navigateToPdfViewer}
  />;

SearchFoiRequestSingle.navigationOptions = FoiRequestSingle.navigationOptions;

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
          routeName: 'SearchPdfViewer',
          params,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchFoiRequestSingle
);
