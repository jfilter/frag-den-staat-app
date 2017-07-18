import { mapToFakeStatus } from '../utils';
import { fetchAndDispatch } from '../utils/networking';

function foiRequestsErrorAction(error) {
  return {
    type: 'FOI_REQUESTS_ERROR',
    error,
  };
}

function foiRequestsErrorClearAction() {
  return {
    type: 'FOI_REQUESTS_ERROR_CLEAR',
  };
}

function foiRequestsInvalidateDataAction() {
  return {
    type: 'FOI_REQUESTS_INVALIDATE_DATA',
  };
}

function foiRequestsPendingAction() {
  return {
    type: 'FOI_REQUESTS_PENDING',
  };
}

function foiRequestsSuccessAction(requests) {
  return {
    type: 'FOI_REQUESTS_SUCCESS',
    requests,
  };
}

function foiRequestsRefreshingAction() {
  return {
    type: 'FOI_REQUESTS_REFRESHING',
  };
}

function foiRequestsRefreshingSuccessAction(requests) {
  return {
    type: 'FOI_REQUESTS_REFRESHING_SUCCESS',
    requests,
  };
}

function foiRequestsFilterChangeAction(filter) {
  return {
    type: 'FOI_REQUESTS_FILTER_CHANGE',
    filter,
  };
}

const PAGE_SIZE = 20;
const ORIGIN = 'https://fragdenstaat.de';
const DEFAULT_PATH = '/api/v1/request/';

function fetchRequets(beforeFetch, onSuccessFetch) {
  return (dispatch, getState) => {
    const { filter, nPage, isRefreshing } = getState().foiRequests;
    let offset = PAGE_SIZE * nPage;

    // page is still the former value in case the refresh fails
    if (isRefreshing) {
      offset = 0;
    }
    const url = `${ORIGIN}${DEFAULT_PATH}`;
    const baseParam = `?limit=${PAGE_SIZE}&offset=${offset}&is_foi=true`; // filter out crap
    let params = baseParam;

    if (filter.jurisdiction) {
      params += `&jurisdiction=${filter.jurisdiction}`;
    }

    if (filter.status) {
      // fake status and resolition
      const { status, resolution } = mapToFakeStatus(filter.status);

      params += `&status=${status}`;
      if (resolution) {
        params += `&resolution=${resolution}`;
      }
    }

    // TODO: Not supported by the API?
    // if (filter.category) {
    //   params += `&category=${filter.category}`;
    // }

    const fullUrl = `${url}${params}`;

    fetchAndDispatch(
      fullUrl,
      dispatch,
      beforeFetch,
      onSuccessFetch,
      foiRequestsErrorAction
    );
  };
}

function foiRequestsFetchData() {
  return fetchRequets(foiRequestsPendingAction, foiRequestsSuccessAction);
}

function foiRequestsRefreshData() {
  return fetchRequets(
    foiRequestsRefreshingAction,
    foiRequestsRefreshingSuccessAction
  );
}

function foiRequestsFilterChange(filter) {
  return dispatch => {
    dispatch(foiRequestsFilterChangeAction(filter));
    // first delete old data
    dispatch(foiRequestsInvalidateDataAction());
    //  and second fetch new one
    dispatch(foiRequestsFetchData());
  };
}

export {
  foiRequestsFetchData,
  foiRequestsRefreshData,
  foiRequestsFilterChange,
  foiRequestsErrorClearAction,
};
