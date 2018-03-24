import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import Intro from '../../components/foiRequests/Intro';

const FoiRequestsIntroScreen = props => <Intro {...props} />;

FoiRequestsIntroScreen.navigationOptions = {
  header: null,
  tabBarVisible: false,
  drawerLockMode: 'locked-closed', // disable global drawer
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToIntroVideo: () =>
      dispatch(NavigationActions.navigate({ routeName: 'ProfileIntroVideo' })),
    navigateToMain: () => dispatch(NavigationActions.back()),
  };
};

export default connect(null, mapDispatchToProps)(FoiRequestsIntroScreen);
