import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import Intro from '../../components/foiRequests/Intro';

const FoiRequestsIntroScreen = ({ navigateToMain }) => (
  <Intro navigateToMain={navigateToMain} />
);

FoiRequestsIntroScreen.navigationOptions = {
  header: null,
  tabBarVisible: false,
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToMain: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'FoiRequestsMaster',
        })
      ),
  };
};

export default connect(null, mapDispatchToProps)(FoiRequestsIntroScreen);
