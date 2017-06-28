function foiRequestsError(error) {
  return {
    type: 'FOI_REQUESTS_ERROR',
    error,
  };
}

function foiRequestsPending() {
  return {
    type: 'FOI_REQUESTS_PENDING',
  };
}

function foiRequestsSuccess(requests) {
  return {
    type: 'FOI_REQUESTS_SUCCESS',
    requests,
  };
}

function foiRequestsFetchData(url) {
  return dispatch => {
    dispatch(foiRequestsPending());

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response;
      })
      .then(response => response.json())
      .then(requests => dispatch(foiRequestsSuccess(requests)))
      .catch(error => dispatch(foiRequestsError(error.message)));
  };
}

const ORIGIN = 'https://fragdenstaat.de';

function foiRequestsFetchFirstData() {
  return foiRequestsFetchData(`${ORIGIN}/api/v1/request/`);
}

function foiRequestsFetchMoreData(nextUrl) {
  return foiRequestsFetchData(`${ORIGIN}${nextUrl}`);
}

export { foiRequestsFetchFirstData, foiRequestsFetchMoreData };
