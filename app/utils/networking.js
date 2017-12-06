import cache from 'react-native-modest-cache';

const userAgent = __DEV__ ? 'FragDenStaat App Development' : 'FragDenStaat App';

const headers = {
  Accept: 'application/json',
  'User-Agent': userAgent,
};

function getFromCacheOrFetch(url) {
  return new Promise((resolve, reject) => {
    cache.get(url).then(value => {
      if (value) {
        resolve(value);
      } else {
        fetch(encodeURI(url), { headers })
          .then(response => {
            if (!response.ok) {
              reject(response.status);
            }
            setTimeout(() => null, 0); // workaround for issue-6679
            return response;
          })
          .then(response => response.json())
          .then(response => {
            cache.set(url, response);
            resolve(response);
          });
      }
    });
  });
}

/**
 * Fetches data from the URL and dispatches action creators according to the state of the fetching process.
 *
 * @param      {Function}  buildUrl         Returns Url
 * @param      {Function}  dispatch        The dispatch
 * @param      {Function}  beforeFetch     The before fetch
 * @param      {Function}  onSuccessFetch  On success fetch
 * @param      {Function}  onErrorFetch    On error fetch
 */
function fetchAndDispatch(
  buildUrl,
  dispatch,
  beforeFetch,
  onSuccessFetch,
  onErrorFetch
) {
  dispatch(beforeFetch());
  const url = buildUrl();
  getFromCacheOrFetch(url)
    .then(onSuccessFetch)
    .catch(error => dispatch(onErrorFetch(error.message)));
}

function fetchMultipleAndDispatch(
  urls,
  dispatch,
  beforeFetch,
  onSuccessFetch,
  onErrorFetch
) {
  dispatch(beforeFetch());

  Promise.all(urls.map(getFromCacheOrFetch))
    .then(onSuccessFetch)
    .catch(error => dispatch(onErrorFetch(error.message)));
}

export { fetchAndDispatch, fetchMultipleAndDispatch };
