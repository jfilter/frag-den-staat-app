import { combineReducers } from 'redux';

import navigation from './navigation';
import authentication from './authentication';
import foiRequests from './foiRequests';
import search from './search';

const AppReducer = combineReducers({
  navigation,
  authentication,
  foiRequests,
  search,
});

export default AppReducer;
