const userAgent = __DEV__ ? 'FragDenStaat App Development' : 'FragDenStaat App';

const headers = {
  Accept: 'application/json',
  'User-Agent': userAgent,
};

/**
 * Fetches data from the URL and dispatches action creators according to the state of the fetching process.
 *
 * @param      {string}    url             The url
 * @param      {Function}  dispatch        The dispatch
 * @param      {Function}  beforeFetch     The before fetch
 * @param      {Function}  onSuccessFetch  On success fetch
 * @param      {Function}  onErrorFetch    On error fetch
 */
function fetchAndDispatch(
  url,
  dispatch,
  beforeFetch,
  onSuccessFetch,
  onErrorFetch
) {
  dispatch(beforeFetch());
  fetch(encodeURI(url), { headers })
    .then(response => {
      if (!response.ok) {
        throw Error(response.status);
      }
      setTimeout(() => null, 0); // workaround for issue-6679
      return response;
    })
    .then(response => response.json())
    .then(onSuccessFetch)
    .catch(error => dispatch(onErrorFetch(error.message)));
}

export { fetchAndDispatch };
