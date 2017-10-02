import { ORIGIN } from '../globals';
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

function searchPublicBodiesErrorAction(error) {
  return {
    type: 'SEARCH_PUBLIC_BODIES_ERROR',
    error,
  };
}

function searchPublicBodiesErrorClearAction() {
  return {
    type: 'SEARCH_PUBLIC_BODIES_ERROR_CLEAR',
  };
}

function searchPublicBodiesPendingAction() {
  return {
    type: 'SEARCH_PUBLIC_BODIES_PENDING',
  };
}

function searchPublicBodiesSuccessAction(results) {
  return {
    type: 'SEARCH_PUBLIC_BODIES_SUCCESS',
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

const SEARCH_FOI_REQUESTS_PATH = '/api/v1/request/search/';
const SEARCH_PUBLIC_BODIES_PATH = '/api/v1/publicbody/search/';

function searchFoiRequests() {
  return (dispatch, getState) => {
    const url = `${ORIGIN}${SEARCH_FOI_REQUESTS_PATH}?q=${getState().search
      .query}`;

    const onSuccess = (innerDispatch => data =>
      innerDispatch(searchFoiRequestsSuccessAction(data)))(dispatch);

    fetchAndDispatch(
      url,
      dispatch,
      searchFoiRequestsPendingAction,
      onSuccess,
      searchFoiRequestsErrorAction
    );
  };
}

function searchPublicBodies() {
  return (dispatch, getState) => {
    const url = `${ORIGIN}${SEARCH_PUBLIC_BODIES_PATH}?q=${getState().search
      .query}`;

    const onSuccess = (innerDispatch => data =>
      innerDispatch(searchPublicBodiesSuccessAction(data)))(dispatch);

    fetchAndDispatch(
      url,
      dispatch,
      searchPublicBodiesPendingAction,
      onSuccess,
      searchPublicBodiesErrorAction
    );
  };
}

export {
  searchFoiRequests,
  searchFoiRequestsErrorClearAction,
  searchPublicBodies,
  searchPublicBodiesErrorClearAction,
  searchUpdateQuery,
  searchUpdatePastQueries,
};
