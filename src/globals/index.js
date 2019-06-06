const ORIGIN = 'https://fragdenstaat.de';

const FOI_REQUESTS_PAGE_SIZE = 20;

const FOI_REQUESTS_PATH = '/api/v1/request/';
const PUBLIC_BODIES_PATH = '/api/v1/publicbody/';
const SEARCH_FOI_REQUESTS_PATH = '/api/v1/request/search/';
const SEARCH_PUBLIC_BODIES_PATH = '/api/v1/publicbody/search/';
const USER_PATH = '/api/v1/user/';

const OAUTH_PROXY_HOSTNAME = 'https://fds-oauth-proxy.app.vis.one';
const PROXY_HOSTNAME = 'https://fds-proxy.app.vis.one';
const GET_REQUEST_ID_HOSTNAME =
  'https://get-fds-request-id-by-slug.app.vis.one';

const APP_URI_SCHEME = 'fragdenstaat';
const OAUTH_REDIRECT_URI = `${APP_URI_SCHEME}://authorize`;

const OAUTH_CLIENT_ID = 'WUNCyTgGhVpLrqilf5MrVOroD6oRDfttHFqbAt2X';
const OAUTH_CLIENT_SECRET = 'secret';

const OAUTH_SCOPES_AS_LIST = [
  'read:user',
  'read:profile',
  'read:request',
  'make:request',
  'follow:request',
];
const OAUTH_SCOPE = OAUTH_SCOPES_AS_LIST.join('%20');

export {
  OAUTH_PROXY_HOSTNAME,
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
  PROXY_HOSTNAME,
  GET_REQUEST_ID_HOSTNAME,
};
