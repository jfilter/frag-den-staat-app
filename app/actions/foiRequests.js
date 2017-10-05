import R from 'ramda';

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

function fetchRequests(beforeFetchDispatchedAction, onSuccessFetch) {
  return (dispatch, getState) => {
    const { filter } = getState().foiRequests;

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
      getState,
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
