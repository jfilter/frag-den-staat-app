import cache from 'react-native-modest-cache';

import { ORIGIN } from '../globals';
import { mapToFakeStatus } from './';

const userAgent = __DEV__ ? 'FragDenStaat App Development' : 'FragDenStaat App';

const headers = {
  Accept: 'application/json',
  'User-Agent': userAgent,
};

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
    const { status, resolution } = mapToFakeStatus(filter.status.param);

    params.set('status', status);
    if (resolution) {
      params.set('resolution', resolution);
    }
  }

  if (filter.publicBody) {
    params.set('public_body', filter.publicBody.param);
    params.delete('is_foi'); // show all requests here. it's irritating when the numbers show on the button don't match with the one in the table.
  } else {
    // when the requests are filtered by public body, ignore jurisdiction and category
    if (filter.jurisdiction) {
      params.set('jurisdiction', filter.jurisdiction.param);
    }

    // TODO: Not supported by the API?
    // if (filter.category) {
    //   params += `&category=${filter.category}`;
    // }
  }

  const paramsAsString = [...params].map(x => `${x[0]}=${x[1]}`).join('&');

  console.log(`${url}?${paramsAsString}`);

  return `${url}?${paramsAsString}`;
}

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
 * @param      {Function}  getState        In order to get the current state
 * @param      {Function}  dispatch        The dispatch
 * @param      {Function}  beforeFetch     The before fetch
 * @param      {Function}  onSuccessFetch  On success fetch
 * @param      {Function}  onErrorFetch    On error fetch
 */
function fetchAndDispatch(
  getState,
  dispatch,
  beforeFetch,
  onSuccessFetch,
  onErrorFetch
) {
  dispatch(beforeFetch());
  const { filter, nPage, isRefreshing } = getState().foiRequests;
  const url = buildUrl(filter, nPage, isRefreshing);
  getFromCacheOrFetch(url)
    .then(onSuccessFetch)
    .catch(error => dispatch(onErrorFetch(error.message)));
}

export { fetchAndDispatch };
