const initialState = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  errorMessage: null,
  timeStamp: null,
  firstName: null,
  lastName: null,
  userId: null,
  userInformationPending: null,
  userInformationError: null,
};

function authentication(state = initialState, action) {
  switch (action.type) {
    case 'OAUTH_UPDATE_TOKEN':
      return {
        ...state,
        ...action.token,
      };
    case 'RECEIVE_OAUTH_REDIRECT_ERROR':
      return { ...state, errorMessage: action.errorMessage };
    case 'USER_INFORMATION_SUCCESS':
      return {
        ...state,
        firstName: action.user.first_name,
        lastName: action.user.last_name,
        userId: action.user.id,
        userInformationError: null,
        userInformationPending: null,
      };
    case 'USER_INFORMATION_PENDING':
      return {
        ...state,
        userInformationPending: true,
      };
    case 'USER_INFORMATION_ERROR':
      return {
        ...state,
        userInformationPending: null,
        userInformationError: action.error,
      };
    case 'OAUTH_LOGOUT':
      return { ...initialState };
    case 'CLEAR_ERROR':
      return { ...state, errorMessage: null };
    default:
      return state;
  }
}

export default authentication;
