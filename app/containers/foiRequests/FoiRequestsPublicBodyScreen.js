import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import { fetchPublicBody } from '../../actions/publicBodies';
import { foiRequestsFilterChange } from '../../actions/foiRequests';
import { primaryColorLight } from '../../globals/colors';
import PublicBodyDetails from '../../components/library/PublicBodyDetails';

// eslint-disable-next-line react/prop-types
class FoiRequestPublicBodyScreen extends React.Component {
  componentDidMount() {
    const { publicBody, publicBodyId, fetchPB } = this.props;
    if (!publicBody || publicBody.id != publicBodyId) {
      fetchPB(publicBodyId);
    }
  }

  render() {
    const {
      isPending,
      error,
      publicBody,
      changeFilter,
      navigateToFoiRequests1,
      navigateToFoiRequests2,
    } = this.props;
    if (!publicBody || isPending) {
      return (
        <View
          style={{ backgroundColor: 'white', paddingTop: 10, height: '100%' }}
        >
          <ActivityIndicator animating size="large" color={primaryColorLight} />
        </View>
      );
    } else if (error) {
      return (
        <View>
          <Text>Error: {error}</Text>
        </View>
      );
    } else {
      return (
        <PublicBodyDetails
          publicBody={publicBody}
          navigateToFoiRequests1={navigateToFoiRequests1}
          navigateToFoiRequests2={navigateToFoiRequests2}
          changeFilter={changeFilter}
        />
      );
    }
  }
}

FoiRequestPublicBodyScreen.navigationOptions =
  PublicBodyDetails.navigationOptions;

const mapStateToProps = (state, props) => {
  return {
    publicBody: state.publicBodies.publicBody,
    isPending: state.publicBodies.isPending,
    error: state.publicBodies.error,
    publicBodyId: props.navigation.state.params.publicBodyId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: publicBody => dispatch(foiRequestsFilterChange(publicBody)),
    fetchPB: publicBodyId => dispatch(fetchPublicBody(publicBodyId)),
    navigateToFoiRequests1: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'Requests',
        })
      ),
    navigateToFoiRequests2: () =>
      dispatch(NavigationActions.navigate({ routeName: 'FoiRequestsMaster' })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestPublicBodyScreen
);
