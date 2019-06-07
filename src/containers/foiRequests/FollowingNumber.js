import { Text } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';

import { foiRequestsUpdateFollowerCountsAction } from '../../actions/foiRequests';

class FollowingNumber extends React.Component {
  async componentDidMount() {
    const { id, updateFollowerCount, currentUserId } = this.props;

    if (currentUserId != null) return;

    try {
      const responseFollower = await fetch(
        'https://fragdenstaat.de/api/v1/following/?request=' + id
      );
      const count = (await responseFollower.json())['objects'][0].follow_count;
      updateFollowerCount({ [id]: count });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { followerCounts, id } = this.props;

    const followerCountsId = followerCounts[id];

    if (followerCountsId == null) {
      return <Text selectable>..</Text>;
    }

    return <Text selectable>{followerCountsId}</Text>;
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.authentication.userId,
    followerCounts: state.foiRequests.followerCounts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateFollowerCount: x =>
      dispatch(foiRequestsUpdateFollowerCountsAction(x)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowingNumber);
