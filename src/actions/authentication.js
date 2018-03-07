import { ORIGIN, USER_PATH } from '../globals';
import { fetchWithoutCache } from '../utils/networking';

function receiveOauthRedirectSuccess(params) {
  return {
    type: 'RECEIVE_OAUTH_REDIRECT_SUCCESS',
    params,
  };
}

function receiveOauthRedirectError(errorMessage) {
  return {
    type: 'RECEIVE_OAUTH_REDIRECT_ERROR',
    errorMessage,
  };
}

function oauthUserSucess(user) {
  return {
    type: 'OAUTH_USER_SUCCESS',
    user,
  };
}

function getUserInformation() {
  return (dispatch, getState) => {
    fetchWithoutCache(`${ORIGIN}/${USER_PATH}`, {
      Authorization: `Bearer ${getState().authentication.accessToken}`,
    })
      .then(data => dispatch(oauthUserSucess(data)))
      .catch(error => console.log(error));
  };
}

export {
  receiveOauthRedirectSuccess,
  receiveOauthRedirectError,
  getUserInformation,
};
