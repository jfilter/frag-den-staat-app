import {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_PROXY_HOSTNAME,
  OAUTH_REDIRECT_URI,
  OAUTH_SCOPE,
  ORIGIN,
} from '../globals';

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
  const theUrl = `${OAUTH_PROXY_HOSTNAME}/account/token/?client_id=${OAUTH_CLIENT_ID}&client_secret=${OAUTH_CLIENT_SECRET}&grant_type=authorization_code&code=${code}&redirect_uri=${OAUTH_REDIRECT_URI}`;
  return fetch(theUrl, { method: 'post' });
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

const handleRedirectAfterLoginClick = url => {
  return new Promise(async (resolve, reject) => {
    const paramString = url.substr(OAUTH_REDIRECT_URI.length);
    const params = getParams(paramString);
    console.log('params', params);

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
      const exchangeTokenResponse = await exchangeCodeForAuthToken(code);
      const exchangeTokenResponseJson = await exchangeTokenResponse.json();
      const token = getTokens(exchangeTokenResponseJson);
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

const getCurrentAccessTokenOrRefresh = (getState, dispatch) => {
  const { timeStamp, expiresIn, accessToken } = getState().authentication;

  // is the token at least for 60s valid? if yes, return
  if (timeStamp + expiresIn > Date.now() + 60) {
    return accessToken;
  } else {
    // refresh the access token use the token right away
    // data data
    // dispatch action
    // return access token
  }
};

export {
  getParams,
  requestAuthToken,
  handleRedirectAfterLoginClick,
  getCurrentAccessTokenOrRefresh,
};
