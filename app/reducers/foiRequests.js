const initialState = { isPending: false, requests: [], error: '' };

function foiRequests(state = initialState, action) {
  switch (action.type) {
    case 'FOI_REQUESTS_ERROR':
      return { ...state, isPending: false, error: action.error };
    case 'FOI_REQUESTS_PENDING':
      return { ...state, isPending: true };
    case 'FOI_REQUESTS_SUCCESS':
      return { ...state, isPending: false, requests: action.requests.objects };
    default:
      return state;
  }
}

export default foiRequests;
