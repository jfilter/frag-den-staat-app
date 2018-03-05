const initialState = {
  accessToken: null,
  accessTokenExpirationDate: null,
  errorMessage: null,
};

function authentication(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_OAUTH_REDIRECT_SUCCESS':
      return {
        ...state,
        accessToken: action.params.access_token,
        accessTokenExpirationDate: action.params.expires_in,
      };
    case 'RECEIVE_OAUTH_REDIRECT_ERROR':
      return { ...state, errorMessage: action.errorMessage };
    case 'CLEAR_ERROR':
      return { ...state, errorMessage: null };
    default:
      return state;
  }
}

export default authentication;
