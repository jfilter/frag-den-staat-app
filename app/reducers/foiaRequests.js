const initialState = { isPending: false, requests: [], error: '' };

export default function foiaRequests(state = initialState, action) {
  switch (action.type) {
    case 'FOIA_REQUESTS_ERROR':
      return { ...state, isPending: false, error: action.error };
    case 'FOIA_REQUESTS_PENDING':
      return { ...state, isPending: true };
    case 'FOIA_REQUESTS_SUCCESS':
      return { ...state, isPending: false, requests: action.requests.objects };
    default:
      return state;
  }
}

