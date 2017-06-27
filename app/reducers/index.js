import { combineReducers } from 'redux';

import navigation from './navigation';
import authentication from './authentication';
import foiaRequests from './foiaRequests';


const AppReducer = combineReducers({
  navigation,
  authentication,
  foiaRequests,
});

export default AppReducer;
