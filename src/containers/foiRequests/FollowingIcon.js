import React from 'react';
import { connect } from 'react-redux';

import { ORIGIN } from '../../globals';
import NavBarIcon from '../../components/foiRequests/NavBarIcon';
import { getCurrentAccessTokenOrRefresh } from '../../utils/oauth';
import { clearCache } from '../../utils/networking';
import { foiRequestsUpdateFollowerCountsAction } from '../../actions/foiRequests';

class FollowingIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canFollow: false,
      follows: false,
      deleteUrl: null,
    };
  }

  async componentDidMount() {
    const {
      id,
      getAccessToken,
      currentUserId,
      updateFollowerCount,
    } = this.props;

    if (currentUserId == null) return;

    const accesToken = await getAccessToken();
    const url = `${ORIGIN}/api/v1/following/?request=${id}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    const resJson = await response.json();
    const res = resJson.objects[0];
    this.setState({
      canFollow: res.can_follow,
      follows: res.follows,
      deleteUrl: res.resource_uri,
    });

    updateFollowerCount({ [id]: res.follow_count });
  }

  async toggleFollow() {
    try {
      const {
        id,
        getAccessToken,
        followerCounts,
        updateFollowerCount,
      } = this.props;
      const accesToken = await getAccessToken();

      if (this.state.follows) {
        const response = await fetch(this.state.deleteUrl, {
          method: 'delete',
          headers: {
            Authorization: `Bearer ${accesToken}`,
          },
        });
        // because the follower count is not done here, the following counter will net get updated.
        // FIXME: put following stuff into redux store
        if (response.status === 204) {
          this.setState({ follows: !this.state.follows });
        }
        clearCache();
        updateFollowerCount({ [id]: followerCounts[id] - 1 });
      } else {
        const response = await fetch(`${ORIGIN}/api/v1/following/`, {
          method: 'post',
          body: JSON.stringify({ request: id }),
          headers: {
            Authorization: `Bearer ${accesToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        // because the follower count is not done here, the following counter will net get updated.
        // FIXME: put following stuff into redux store
        const resJson = await response.json();
        if (resJson.status === 'success') {
          this.setState({
            follows: !this.state.follows,
            deleteUrl: resJson.url,
          });
          clearCache();
          updateFollowerCount({ [id]: followerCounts[id] + 1 });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { canFollow, follows } = this.state;
    if (canFollow && !follows) {
      return (
        <NavBarIcon
          iconName={'star-border'}
          iconType={'material'}
          onPress={() => this.toggleFollow()}
        />
      );
    }
    if (canFollow && follows) {
      return (
        <NavBarIcon
          iconName={'star'}
          iconType={'material'}
          onPress={() => this.toggleFollow()}
        />
      );
    }
    return null;
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
    getAccessToken: () =>
      dispatch((innerDispatch, getState) =>
        getCurrentAccessTokenOrRefresh(innerDispatch, getState)
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowingIcon);
