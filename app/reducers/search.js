const initialState = {
  foiRequestsIsPending: false,
  foiRequestsResults: [],
  foiRequestsError: '',
  query: '',
};

function search(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_FOI_REQUESTS_ERROR':
      return {
        ...state,
        foiRequestsIsPending: false,
        foiRequestsError: action.error,
      };
    case 'SEARCH_FOI_ERROR_CLEAR':
      return {
        ...state,
        foiRequestsError: '',
      };
    case 'SEARCH_FOI_REQUESTS_PENDING':
      return { ...state, foiRequestsIsPending: true, foiRequestsResults: [] };
    case 'SEARCH_FOI_REQUESTS_SUCCESS': {
      return {
        ...state,
        foiRequestsIsPending: false,
        foiRequestsResults: action.results.objects,
      };
    }
    case 'SEARCH_UPDATE_QUERY':
      return { ...state, query: action.query };
    default:
      return state;
  }
}

export default search;
