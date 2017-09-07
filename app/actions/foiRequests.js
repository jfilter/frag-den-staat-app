import R from 'ramda';

import { mapToFakeStatus } from '../utils';
import { fetchAndDispatch } from '../utils/networking';
import { ORIGIN } from '../utils/globals';

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
const DEFAULT_PATH = '/api/v1/request/';

function buildUrl(filter, nPage, isRefreshing) {
  let offset = PAGE_SIZE * nPage;

  // page is still the former value in case the refresh fails
  if (isRefreshing) {
    offset = 0;
  }
  const url = `${ORIGIN}${DEFAULT_PATH}`;

  const params = new Map([
    ['limit', `${PAGE_SIZE}`],
    ['offset', `${offset}`],
    ['is_foi', 'true'], // filter out crappy requests
  ]);

  if (filter.status) {
    // fake status and resolition
    const { status, resolution } = mapToFakeStatus(filter.status);

    params.set('status', status);
    if (resolution) {
      params.set('resolution', resolution);
    }
  }

  if (filter.publicBody) {
    params.set('public_body', filter.publicBody);
  } else {
    // when the requests are filtered by public body, ignore jurisdiction and category
    if (filter.jurisdiction) {
      params.set('jurisdiction', filter.jurisdiction);
    }

    // TODO: Not supported by the API?
    // if (filter.category) {
    //   params += `&category=${filter.category}`;
    // }
  }

  const paramsAsString =
    '?' + [...params].map(x => `${x[0]}=${x[1]}`).join('&');

  return `${url}${paramsAsString}`;
}

function fetchRequests(beforeFetchDispatchedAction, onSuccessFetch) {
  return (dispatch, getState) => {
    const { filter, nPage, isRefreshing } = getState().foiRequests;

    const url = buildUrl(filter, nPage, isRefreshing);

    // only dispatch if the filter is still the same
    const onSuccess = (function makeOnSuccessFunc(
      innerDispatch,
      innerGetState,
      innerFilter
    ) {
      return data => {
        if (R.equals(innerFilter, innerGetState().foiRequests.filter)) {
          innerDispatch(onSuccessFetch(data));
        }
      };
    })(dispatch, getState, filter);

    fetchAndDispatch(
      url,
      dispatch,
      beforeFetchDispatchedAction,
      onSuccess,
      foiRequestsErrorAction,
      filter
    );
  };
}

function foiRequestsFetchData() {
  return fetchRequests(foiRequestsPendingAction, foiRequestsSuccessAction);
}

function foiRequestsRefreshData() {
  return fetchRequests(
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
