import React from 'react';
import { connect } from 'react-redux';

import { ORIGIN } from '../../globals';
import NavBarIcon from '../../components/foiRequests/NavBarIcon';
import { getCurrentAccessTokenOrRefresh } from '../../utils/oauth';

class FollowingIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canFollow: false,
      follows: false,
      follow_count: 0,
    };
  }

  async componentDidMount() {
    const { id, getAccessToken } = this.props;
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
    });
  }

  async toggleFollow() {
    try {
      const { id, getAccessToken } = this.props;
      const accesToken = await getAccessToken();
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
        this.setState({ follows: !this.state.follows });
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

const mapDispatchToProps = dispatch => {
  return {
    getAccessToken: () =>
      dispatch((innerDispatch, getState) =>
        getCurrentAccessTokenOrRefresh(innerDispatch, getState)
      ),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FollowingIcon);
