import { fetchAndDispatch } from '../utils/networking';

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

function searchFoiRequests() {
  return (dispatch, getState) => {
    const url = `${ORIGIN}${DEFAULT_PATH}?q=${getState().query}`;
    fetchAndDispatch(
      url,
      dispatch,
      searchFoiRequestsPendingAction,
      searchFoiRequestsSuccessAction,
      searchFoiRequestsErrorAction
    );
  };
}

export {
  searchFoiRequests,
  searchFoiRequestsErrorClearAction,
  searchUpdateQuery,
  searchUpdatePastQueries,
};
