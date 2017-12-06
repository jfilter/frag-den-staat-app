import { combineReducers } from 'redux';

import authentication from './authentication';
import foiRequests from './foiRequests';
import messages from './messages';
import navigation from './navigation';
import publicBodies from './publicBodies';
import search from './search';

const AppReducer = combineReducers({
  navigation,
  authentication,
  foiRequests,
  search,
  publicBodies,
  messages,
});

export default AppReducer;
