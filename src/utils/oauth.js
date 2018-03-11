import {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_PROXY_HOSTNAME,
  OAUTH_REDIRECT_URI,
  OAUTH_SCOPE,
  ORIGIN,
} from '../globals';
import { oauthUpdateToken } from '../actions/authentication';
import { saveToken } from './secureStorage';

// https://stackoverflow.com/a/3855394/4028896
const _getParams = query => {
  if (!query) {
    return {};
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
      const [key, value] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, {});
};
const getParams = query => new Map(Object.entries(_getParams(query)));

const requestAuthToken = `${ORIGIN}/account/authorize/?client_id=${OAUTH_CLIENT_ID}&scope=${OAUTH_SCOPE}&response_type=code&redirect_uri=${OAUTH_REDIRECT_URI}`;

const exchangeCodeForAuthToken = code => {
  const url = `${OAUTH_PROXY_HOSTNAME}/account/token/?client_id=${OAUTH_CLIENT_ID}&client_secret=${OAUTH_CLIENT_SECRET}&grant_type=authorization_code&code=${code}&redirect_uri=${OAUTH_REDIRECT_URI}`;
  return fetch(url, { method: 'post' });
};

const refreshAccessToken = refreshToken => {
  const url = `${OAUTH_PROXY_HOSTNAME}/account/token/?client_id=${OAUTH_CLIENT_ID}&client_secret=${OAUTH_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refreshToken}&scope=${OAUTH_SCOPE}`;
  return fetch(url, { method: 'post ' });
};

const getJsonOrThrow = async fetchingPromise => {
  const response = await fetchingPromise;
  if (!response.ok) {
    throw new Error(`${response.status}: ${response}`);
  }
  return response.json();
};

// should be done in the reducer
const getTokens = body => {
  return {
    accessToken: body.access_token,
    refreshToken: body.refresh_token,
    expiresIn: body.expires_in,
    timeStamp: Date.now(),
  };
};

const fetchInitialToken = url => {
  return new Promise(async (resolve, reject) => {
    const paramString = url.substr(OAUTH_REDIRECT_URI.length);
    const params = getParams(paramString);

    if (params.has('error')) {
      const errorMessage =
        params.get('error') +
        (params.has('error_description')
          ? `: ${params.get('error_description')}`
          : '');
      reject(new Error(errorMessage));
    }

    if (!params.has('code')) {
      reject(new Error('no auth code was provided by the backend'));
    }

    try {
      const code = params.get('code');
      const exchangeTokenResponseJson = await getJsonOrThrow(
        exchangeCodeForAuthToken(code)
      );
      const token = getTokens(exchangeTokenResponseJson);
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

const getCurrentAccessTokenOrRefresh = (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        timeStamp,
        expiresIn,
        accessToken,
        refreshToken,
      } = getState().authentication;

      const secondsLeftBeforeRefreshing = 36000;

      // is the token at least for X seconds valid?
      if (timeStamp + expiresIn > Date.now() + secondsLeftBeforeRefreshing) {
        // if yes, return
        resolve(accessToken);
      } else {
        // if no,
        // 1. refresh the access token
        const refreshedToken = await getJsonOrThrow(
          refreshAccessToken(refreshToken, accessToken, expiresIn)
        );
        const token = getTokens(refreshedToken);
        // 2. update the access token in the redux store (async)
        dispatch(oauthUpdateToken(token));
        // 3. persist new token (async)
        saveToken(token);
        // 4. return the new access token
        resolve(token.accessToken);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export {
  getParams,
  requestAuthToken,
  fetchInitialToken,
  getCurrentAccessTokenOrRefresh,
};
