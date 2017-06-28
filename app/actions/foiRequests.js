export function foiRequestsError(error) {
  return {
    type: 'FOI_REQUESTS_ERROR',
    error,
  };
}

export function foiRequestsPending() {
  return {
    type: 'FOI_REQUESTS_PENDING',
  };
}

export function foiRequestsSuccess(requests) {
  return {
    type: 'FOI_REQUESTS_SUCCESS',
    requests,
  };
}

const URL = 'https://fragdenstaat.de/api/v1/request/';

export function foiRequestsFetchData() {
  return dispatch => {
    dispatch(foiRequestsPending());

    fetch(URL)
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
