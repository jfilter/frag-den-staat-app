const ORIGIN = 'https://fragdenstaat.de';

const FOI_REQUESTS_PAGE_SIZE = 20;

const FOI_REQUESTS_PATH = '/api/v1/request/';
const PUBLIC_BODIES_PATH = '/api/v1/publicbody/';
const SEARCH_FOI_REQUESTS_PATH = '/api/v1/request/search/';
const SEARCH_PUBLIC_BODIES_PATH = '/api/v1/publicbody/search/';
const USER_PATH = 'api/v1/user/';

const OAUTH_HOSTNAME = 'https://fds-oauth-proxy.app.vis.one';
const APP_URI_SCHEME = 'fragdenstaat';
const OAUTH_REDIRECT_URI = `${APP_URI_SCHEME}://authorize`;

// const OAUTH_CLIENT_ID = 'ix9pNpA5tGulUn07yktemIpMqpGersZjiThklyxQ';

const OAUTH_CLIENT_ID = 'secret';
const OAUTH_CLIENT_SECRET = 'secret';

const OAUTH_SCOPES_AS_LIST = [
  'read:user',
  'read:profile',
  'read:email',
  'read:request',
  'make:request',
];
const OAUTH_SCOPE = OAUTH_SCOPES_AS_LIST.join('%20');

export {
  OAUTH_HOSTNAME,
  OAUTH_REDIRECT_URI,
  ORIGIN,
  FOI_REQUESTS_PAGE_SIZE,
  FOI_REQUESTS_PATH,
  PUBLIC_BODIES_PATH,
  SEARCH_FOI_REQUESTS_PATH,
  SEARCH_PUBLIC_BODIES_PATH,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_SCOPE,
  USER_PATH,
};
