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
        publicBodiesResults: action.results.objects.results,
      };
    }
    case 'SEARCH_UPDATE_QUERY': {
      const { query } = action;
      const pastQueries = [...state.pastQueries];

      // we don't want duplicates so first remove the old ones
      const index = pastQueries.indexOf(query);
      if (index >= 0) {
        pastQueries.splice(index, 1);
      }
      pastQueries.unshift(query);

      // only short the recent 50 queries
      if (pastQueries.length > 50) pastQueries.pop();

      return { ...state, query, pastQueries };
    }
    default:
      return state;
  }
}

export default search;
