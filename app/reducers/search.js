const initialState = {
  foiRequestsIsPending: false,
  foiRequestsResults: [],
  foiRequestsError: '',
  publicBodiesIsPending: false,
  publicBodiesResults: [],
  publicBodiesError: '',
  query: '',
  pastQueries: [],
};

function search(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_FOI_REQUESTS_ERROR':
      return {
        ...state,
        foiRequestsIsPending: false,
        foiRequestsError: action.error,
      };
    case 'SEARCH_FOI_REQUESTS_ERROR_CLEAR':
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
    case 'SEARCH_PUBLIC_BODIES_ERROR':
      return {
        ...state,
        publicBodiesIsPending: false,
        publicBodiesError: action.error,
      };
    case 'SEARCH_PUBLIC_BODIES_ERROR_CLEAR':
      return {
        ...state,
        publicBodiesError: '',
      };
    case 'SEARCH_PUBLIC_BODIES_PENDING':
      return { ...state, publicBodiesIsPending: true, publicBodiesResults: [] };
    case 'SEARCH_PUBLIC_BODIES_SUCCESS': {
      return {
        ...state,
        publicBodiesIsPending: false,
        publicBodiesResults: action.results.objects,
      };
    }
    case 'SEARCH_UPDATE_QUERY':
      return { ...state, query: action.query };
    case 'SEARCH_UPDATE_PAST_QUERIES':
      return { ...state, pastQueries: action.pastQueries };
    default:
      return state;
  }
}

export default search;
