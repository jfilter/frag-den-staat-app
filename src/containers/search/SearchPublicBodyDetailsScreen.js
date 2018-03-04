import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import { foiRequestsFilterChange } from '../../actions/foiRequests';
import PublicBodyDetails from '../../components/screens/PublicBodyDetails';

// eslint-disable-next-line react/prop-types
const SearchPublicBodyDetails = ({
  publicBody,
  changeFilter,
  navigateToFoiRequests1,
  navigateToFoiRequests2,
}) => (
  <PublicBodyDetails
    publicBody={publicBody}
    changeFilter={changeFilter}
    navigateToFoiRequests1={navigateToFoiRequests1}
    navigateToFoiRequests2={navigateToFoiRequests2}
  />
);

SearchPublicBodyDetails.navigationOptions = PublicBodyDetails.navigationOptions;

const mapStateToProps = (state, props) => {
  return {
    publicBody: props.navigation.state.params.publicBody,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: publicBody => dispatch(foiRequestsFilterChange(publicBody)),
    navigateToFoiRequests2: () =>
      dispatch(NavigationActions.navigate({ routeName: 'FoiRequestsMaster' })),
    navigateToFoiRequests1: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'Requests',
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchPublicBodyDetails
);
