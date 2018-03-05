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

export { receiveOauthRedirectSuccess, receiveOauthRedirectError };
