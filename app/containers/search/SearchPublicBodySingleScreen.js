import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import { foiRequestsFilterChange } from '../../actions/foiRequests';
import PublicBodySingle from '../../components/PublicBodySingle';

// eslint-disable-next-line react/prop-types
const SearchPublicBodySingle = ({
  publicBody,
  navigateToFilterByPublicBody,
  navigateToFoiRequests1,
  navigateToFoiRequests2,
  changeFilter,
}) =>
  <PublicBodySingle
    publicBody={publicBody}
    navigateToFilterByPublicBody={navigateToFilterByPublicBody}
    navigateToFoiRequests1={navigateToFoiRequests1}
    navigateToFoiRequests2={navigateToFoiRequests2}
    changeFilter={changeFilter}
  />;

SearchPublicBodySingle.navigationOptions = PublicBodySingle.navigationOptions;

const mapStateToProps = (state, props) => {
  return {
    publicBody: props.navigation.state.params.publicBody,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: newFilter => dispatch(foiRequestsFilterChange(newFilter)),
    navigateToFoiRequests2: () =>
      dispatch(NavigationActions.navigate({ routeName: 'FoiRequestsList' })),
    navigateToFoiRequests1: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'Requests',
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchPublicBodySingle
);
