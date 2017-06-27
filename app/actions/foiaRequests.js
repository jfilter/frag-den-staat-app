export function foiaRequestsError(error) {
  return {
    type: 'FOIA_REQUESTS_ERROR',
    error,
  };
}

export function foiaRequestsPending() {
  return {
    type: 'FOIA_REQUESTS_PENDING',
  };
}

export function foiaRequestsSuccess(requests) {
  return {
    type: 'FOIA_REQUESTS_SUCCESS',
    requests,
  };
}

const URL = 'https://fragdenstaat.de/api/v1/request/';

export function foiaRequestsFetchData() {
  return dispatch => {
    dispatch(foiaRequestsPending());

    fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response;
      })
      .then(response => response.json())
      .then(requests => dispatch(foiaRequestsSuccess(requests)))
      .catch(error => dispatch(foiaRequestsError(error.message)));
  };
}
