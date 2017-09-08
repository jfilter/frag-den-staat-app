import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

import { fetchPublicBody } from '../../actions/publicBodies';
import { primaryColorLight } from '../../styles/colors';
import PublicBodySingle from '../../components/PublicBodySingle';

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
        <ActivityIndicator animating size="large" color={primaryColorLight} />
      );
    } else if (error) {
      return (
        <View>
          <Text>
            Error: {error}
          </Text>
        </View>
      );
    } else {
      return (
        <PublicBodySingle
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
  PublicBodySingle.navigationOptions;

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
    fetchPB: publicBodyId => dispatch(fetchPublicBody(publicBodyId)),
    navigateToFoiRequests1: () =>
      dispatch(
        NavigationActions.navigate({
          routeName: 'Requests',
        })
      ),
    navigateToFoiRequests2: () =>
      dispatch(NavigationActions.navigate({ routeName: 'FoiRequestsList' })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  FoiRequestPublicBodyScreen
);
