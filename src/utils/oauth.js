import { OAUTH_CLIENT_ID, OAUTH_SCOPE } from '../globals';

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

const requestAuthUrl = `https://fragdenstaat.de/account/authorize/?client_id=${OAUTH_CLIENT_ID}&scope=${OAUTH_SCOPE}&response_type=token`;

export { getParams, requestAuthUrl };
