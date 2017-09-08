import { combineReducers } from 'redux';

import authentication from './authentication';
import foiRequests from './foiRequests';
import navigation from './navigation';
import publicBodies from './publicBodies';
import search from './search';

const AppReducer = combineReducers({
  navigation,
  authentication,
  foiRequests,
  search,
  publicBodies,
});

export default AppReducer;
