import { combineReducers } from 'redux';

import navigation from './navigation';
import authentication from './authentication';
import foiRequests from './foiRequests';

const AppReducer = combineReducers({
  navigation,
  authentication,
  foiRequests,
});

export default AppReducer;
