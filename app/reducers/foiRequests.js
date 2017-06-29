const initialState = {
  isPending: false,
  requests: [],
  error: '',
  nextUrl: '',
  isRefreshing: false,
  firstPageFetchedAt: null,
  filter: { status: null, jurisdiction: null, category: null },
};

function foiRequests(state = initialState, action) {
  switch (action.type) {
    case 'FOI_REQUESTS_ERROR':
      return { ...state, isPending: false, error: action.error };
    case 'FOI_REQUESTS_PENDING':
      return { ...state, isPending: true };
    case 'FOI_REQUESTS_SUCCESS': {
      let nextUrl = '';
      if (action.requests.meta.next) {
        nextUrl = action.requests.meta.next;
      }
      return {
        ...state,
        isPending: false,
        requests: [...state.requests, ...action.requests.objects],
        nextUrl,
        firstPageFetchedAt: Date.now(),
      };
    }
    case 'FOI_REQUESTS_REFRESHING':
      return {
        ...state,
        isRefreshing: true,
      };
    case 'FOI_REQUESTS_REFRESHING_SUCCESS': {
      let nextUrl = '';
      if (action.requests.meta.next) {
        nextUrl = action.requests.meta.next;
      }
      return {
        ...state,
        isRefreshing: false,
        requests: action.requests.objects,
        nextUrl,
      };
    }
    default:
      return state;
  }
}

export default foiRequests;
