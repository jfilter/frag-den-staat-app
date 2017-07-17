function searchFoiRequestsErrorAction(error) {
  return {
    type: 'SEARCH_FOI_REQUESTS_ERROR',
    error,
  };
}

function searchFoiRequestsErrorClearAction() {
  return {
    type: 'SEARCH_FOI_REQUESTS_ERROR_CLEAR',
  };
}

function searchFoiRequestsPendingAction() {
  return {
    type: 'SEARCH_FOI_REQUESTS_PENDING',
  };
}

function searchFoiRequestsSuccessAction(results) {
  return {
    type: 'SEARCH_FOI_REQUESTS_SUCCESS',
    results,
  };
}

function searchUpdateQuery(query) {
  return {
    type: 'SEARCH_UPDATE_QUERY',
    query,
  };
}

function searchUpdatePastQueries(pastQueries) {
  return {
    type: 'SEARCH_UPDATE_PAST_QUERIES',
    pastQueries,
  };
}

const ORIGIN = 'https://fragdenstaat.de';
const DEFAULT_PATH = '/api/v1/request/search/';

function fetchAndDispatch(beforeFetch, onSuccessFetch, onErrorFetch) {
  return (dispatch, getState) => {
    dispatch(beforeFetch());

    const url = `${ORIGIN}${DEFAULT_PATH}?q=${getState().query}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        }
        setTimeout(() => null, 0); // workaround for issue-6679
        return response;
      })
      .then(response => response.json())
      .then(requests => dispatch(onSuccessFetch(requests)))
      .catch(error => dispatch(onErrorFetch(error.message)));
  };
}

function searchFoiRequests() {
  return fetchAndDispatch(
    searchFoiRequestsPendingAction,
    searchFoiRequestsSuccessAction,
    searchFoiRequestsErrorAction
  );
}

export {
  searchFoiRequests,
  searchFoiRequestsErrorClearAction,
  searchUpdateQuery,
  searchUpdatePastQueries,
};
