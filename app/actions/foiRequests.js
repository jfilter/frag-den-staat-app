function foiRequestsErrorAction(error) {
  return {
    type: 'FOI_REQUESTS_ERROR',
    error,
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

function fetchAndDispatch(url, beforeFetch, onSuccessFetch) {
  return dispatch => {
    dispatch(beforeFetch());

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
      .catch(error => dispatch(foiRequestsErrorAction(error.message)));
  };
}

const ORIGIN = 'https://fragdenstaat.de';
const DEFAULT_PATH = '/api/v1/request/';

function foiRequestsFetchData(path = DEFAULT_PATH) {
  return fetchAndDispatch(
    `${ORIGIN}${path}`,
    foiRequestsPendingAction,
    foiRequestsSuccessAction
  );
}

function foiRequestsRefreshData() {
  return fetchAndDispatch(
    `${ORIGIN}${DEFAULT_PATH}`,
    foiRequestsRefreshingAction,
    foiRequestsRefreshingSuccessAction
  );
}

export { foiRequestsFetchData, foiRequestsRefreshData };
