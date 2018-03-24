import { PROXY_HOSTNAME, USER_PATH } from '../globals';
import { getCurrentAccessTokenOrRefresh } from '../utils/oauth';
import { getFromCacheOrFetch } from '../utils/networking';

function oauthUpdateToken(token) {
  return {
    type: 'OAUTH_UPDATE_TOKEN',
    token,
  };
}

function receiveOauthRedirectError(errorMessage) {
  return {
    type: 'RECEIVE_OAUTH_REDIRECT_ERROR',
    errorMessage,
  };
}

function oauthLogout() {
  return {
    type: 'OAUTH_LOGOUT',
  };
}

function userInformationPendingAction() {
  return {
    type: 'USER_INFORMATION_PENDING',
  };
}

function userInformationSucessAction(user) {
  return {
    type: 'USER_INFORMATION_SUCCESS',
    user,
  };
}

function userInformationErrorAction(error) {
  return {
    type: 'USER_INFORMATION_ERROR',
    error,
  };
}

function getUserInformation() {
  return (dispatch, getState) => {
    getCurrentAccessTokenOrRefresh(dispatch, getState)
      .then(accessToken => {
        dispatch(userInformationPendingAction());
        return getFromCacheOrFetch(`${PROXY_HOSTNAME}${USER_PATH}`, {
          Authorization: `Bearer ${accessToken}`,
        });
      })
      .then(data => dispatch(userInformationSucessAction(data)))
      .catch(error => dispatch(userInformationErrorAction(error)));
  };
}

export {
  oauthUpdateToken,
  receiveOauthRedirectError,
  getUserInformation,
  oauthLogout,
};
