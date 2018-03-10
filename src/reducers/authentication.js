const initialState = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  errorMessage: null,
  timeStamp: null,
  firstName: null,
  lastName: null,
  userId: null,
};

function authentication(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_OAUTH_REDIRECT_SUCCESS':
      return {
        ...state,
        ...action.params,
      };
    case 'RECEIVE_OAUTH_REDIRECT_ERROR':
      return { ...state, errorMessage: action.errorMessage };
    case 'OAUTH_USER_SUCCESS':
      return {
        ...state,
        firstName: action.user.first_name,
        lastName: action.user.last_name,
        userId: action.user.id,
      };
    case 'CLEAR_ERROR':
      return { ...state, errorMessage: null };
    default:
      return state;
  }
}

export default authentication;
