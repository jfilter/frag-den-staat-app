import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import PublicBodySingle from '../../components/PublicBodySingle';

// eslint-disable-next-line react/prop-types
const SearchPublicBodySingle = ({ publicBody, navigateToFilterByPublicBody }) =>
  <PublicBodySingle
    publicBody={publicBody}
    navigateToFilterByPublicBody={navigateToFilterByPublicBody}
  />;

SearchPublicBodySingle.navigationOptions = PublicBodySingle.navigationOptions;

const mapStateToProps = (state, props) => {
  return {
    publicBody: props.navigation.state.params.publicBody,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToFilterByPublicBody: params =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'FoiRequestsFilterPublicBody',
          params,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchPublicBodySingle
);
